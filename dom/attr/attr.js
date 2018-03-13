'use strict';

// # can/util/attr.js
// Central location for attribute changing to occur, used to trigger an
// `attributes` event on elements. This enables the user to do (jQuery example): `$(el).bind("attributes", function(ev) { ... })` where `ev` contains `attributeName` and `oldValue`.
var namespace = require("can-namespace");
var setImmediate = require("../../js/set-immediate/set-immediate");
var getDocument = require("can-globals/document/document");
var global = require("can-globals/global/global")();
var isOfGlobalDocument = require("../is-of-global-document/is-of-global-document");
var setData = require("../data/data");
var domContains = require("../contains/contains");
var domEvents = require("../events/events");
var domDispatch = require("../dispatch/dispatch");
var getMutationObserver = require("can-globals/mutation-observer/mutation-observer");
var each = require("../../js/each/each");
var types = require("can-types");
var diff = require('../../js/diff/diff');

require("../events/attributes/attributes");
require("../events/inserted/inserted");

var namespaces = {
	'xlink': 'http://www.w3.org/1999/xlink'
};

var formElements = {"INPUT": true, "TEXTAREA": true, "SELECT": true},
	// Used to convert values to strings.
	toString = function(value){
		if(value == null) {
			return "";
		} else {
			return ""+value;
		}
	},
	isSVG = function(el){
		return el.namespaceURI === "http://www.w3.org/2000/svg";
	},
	truthy = function() { return true; },
	getSpecialTest = function(special){
		return (special && special.test) || truthy;
	},
	propProp = function(prop, obj){
		obj = obj || {};
		obj.get = function(){
			return this[prop];
		};
		obj.set = function(value){
			if(this[prop] !== value) {
				this[prop] = value;
			}
			return value;
		};
		return obj;
	},
	booleanProp = function(prop){
		return {
			isBoolean: true,
			set: function(value){
				if(prop in this) {
					this[prop] = value !== false;
				} else {
					this.setAttribute(prop, "");
				}
			},
			remove: function(){
				this[prop] = false;
			}
		};
	},
	setupMO = function(el, callback){
		var attrMO = setData.get.call(el, "attrMO");
		if(!attrMO) {
			var onMutation = function(){
				callback.call(el);
			};
			var MO = getMutationObserver();
			if(MO) {
				var observer = new MO(onMutation);
				observer.observe(el, {
					childList: true,
					subtree: true
				});
				setData.set.call(el, "attrMO", observer);
			} else {
				setData.set.call(el, "attrMO", true);
				setData.set.call(el, "canBindingCallback", {onMutation: onMutation});
			}
		}
	},
	_findOptionToSelect = function (parent, value) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION' && value === child.value) {
				return child;
			}
			if (child.nodeName === 'OPTGROUP') {
				var groupChild = _findOptionToSelect(child, value);
				if (groupChild) {
					return groupChild;
				}
			}
			child = child.nextSibling;
		}
	},
	setChildOptions = function(el, value){
		var option;
		if (value != null) {
			option = _findOptionToSelect(el, value);
		}
		if (option) {
			option.selected = true;
		} else {
			el.selectedIndex = -1;
		}
	},
	forEachOption = function (parent, fn) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION') {
				fn(child);
			}
			if (child.nodeName === 'OPTGROUP') {
				forEachOption(child, fn);
			}
			child = child.nextSibling;
		}
	},
	collectSelectedOptions = function (parent) {
		var selectedValues = [];
		forEachOption(parent, function (option) {
			if (option.selected) {
				selectedValues.push(option.value);
			}
		});
		return selectedValues;
	},
	markSelectedOptions = function (parent, values) {
		forEachOption(parent, function (option) {
			option.selected = values.indexOf(option.value) !== -1;
		});
	},
	// Create a handler, only once, that will set the child options any time
	// the select's value changes.
	setChildOptionsOnChange = function(select, aEL){
		var handler = setData.get.call(select, "attrSetChildOptions");
		if(handler) {
			return Function.prototype;
		}
		handler = function(){
			setChildOptions(select, select.value);
		};
		setData.set.call(select, "attrSetChildOptions", handler);
		aEL.call(select, "change", handler);
		return function(rEL){
			setData.clean.call(select, "attrSetChildOptions");
			rEL.call(select, "change", handler);
		};
	},
	attr = {
		special: {
			checked: {
				get: function(){
					return this.checked;
				},
				set: function(val){
					// - `set( truthy )` => TRUE
					// - `set( "" )`     => TRUE
					// - `set()`         => TRUE
					// - `set(undefined)` => false.
					var notFalse = !!val || val === "" || arguments.length === 0;
					this.checked = notFalse;
					if(notFalse && this.type === "radio") {
						this.defaultChecked = true;
					}

					return val;
				},
				remove: function(){
					this.checked = false;
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"class": {
				get: function(){
					if(isSVG(this)) {
						return this.getAttribute("class");
					}
					return this.className;
				},
				set: function(val){
					val = val || "";

					if(isSVG(this)) {
						this.setAttribute("class", "" + val);
					} else {
						this.className = val;
					}
					return val;
				}
			},
			disabled: booleanProp("disabled"),
			focused: {
				get: function(){
					return this === document.activeElement;
				},
				set: function(val){
					var cur = attr.get(this, 'focused');
					var docEl = this.ownerDocument.documentElement;
					var element = this;
					function focusTask() {
						if (val) {
							element.focus();
						} else {
							element.blur();
						}
					}
					if (cur !== val) {
						if (!domContains.call(docEl, element)) {
							var initialSetHandler = function () {
								domEvents.removeEventListener.call(element, 'inserted', initialSetHandler);
								focusTask();
							};
							domEvents.addEventListener.call(element, 'inserted', initialSetHandler);
						} else {
							types.queueTask([
								focusTask,
								this,
								[]
							]);
						}
					}
					return !!val;
				},
				addEventListener: function(eventName, handler, aEL){
					aEL.call(this, "focus", handler);
					aEL.call(this, "blur", handler);
					return function(rEL){
						rEL.call(this, "focus", handler);
						rEL.call(this, "blur", handler);
					};
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"for": propProp("htmlFor"),
			innertext: propProp("innerText"),
			innerhtml: propProp("innerHTML"),
			innerHTML: propProp("innerHTML", {
				addEventListener: function(eventName, handler, aEL){
					var handlers = [];
					var el = this;
					each(["change", "blur"], function(eventName){
						var localHandler = function(){
							handler.apply(this, arguments);
						};
						domEvents.addEventListener.call(el, eventName, localHandler);
						handlers.push([eventName, localHandler]);
					});

					return function(rEL){
						each(handlers, function(info){
							rEL.call(el, info[0], info[1]);
						});
					};
				}
			}),
			required: booleanProp("required"),
			readonly: booleanProp("readOnly"),
			selected: {
				get: function(){
					return this.selected;
				},
				set: function(val){
					val = !!val;
					setData.set.call(this, "lastSetValue", val);
					return this.selected = val;
				},
				addEventListener: function(eventName, handler, aEL){
					var option = this;
					var select = this.parentNode;
					var lastVal = option.selected;
					var localHandler = function(changeEvent){
						var curVal = option.selected;
						lastVal = setData.get.call(option, "lastSetValue") || lastVal;
						if(curVal !== lastVal) {
							lastVal = curVal;

							domDispatch.call(option, eventName);
						}
					};

					var removeChangeHandler = setChildOptionsOnChange(select, aEL);
					domEvents.addEventListener.call(select, "change", localHandler);
					aEL.call(option, eventName, handler);

					return function(rEL){
						removeChangeHandler(rEL);
						domEvents.removeEventListener.call(select, "change", localHandler);
						rEL.call(option, eventName, handler);
					};
				},
				test: function(){
					return this.nodeName === "OPTION" && this.parentNode &&
						this.parentNode.nodeName === "SELECT";
				}
			},
			src: {
				set: function (val) {
					if (val == null || val === "") {
						this.removeAttribute("src");
						return null;
					} else {
						this.setAttribute("src", val);
						return val;
					}
				}
			},
			style: {
				set: (function () {
					var el = global.document && getDocument().createElement('div');
					if ( el && el.style && ("cssText" in el.style) ) {
						return function (val) {
							return this.style.cssText = (val || "");
						};
					} else {
						return function (val) {
							return this.setAttribute("style", val);
						};
					}
				})()
			},
			textcontent: propProp("textContent"),
			value: {
				get: function(){
					var value = this.value;
					if(this.nodeName === "SELECT") {
						if(("selectedIndex" in this) && this.selectedIndex === -1) {
							value = undefined;
						}
					}
					return value;
				},
				set: function(value){
					var nodeName = this.nodeName.toLowerCase();
					if(nodeName === "input" || nodeName === "textarea") {
						// Do some input types support non string values?
						value = toString(value);
					}
					if(this.value !== value || nodeName === "option") {
						this.value = value;
					}
					if(attr.defaultValue[nodeName]) {
						this.defaultValue = value;
					}
					if(nodeName === "select") {
						setData.set.call(this, "attrValueLastVal", value);
						//If it's null then special case
						setChildOptions(this, value === null ? value : this.value);

						// If not in the document reset the value when inserted.
						var docEl = this.ownerDocument.documentElement;
						if(!domContains.call(docEl, this)) {
							var select = this;
							var initialSetHandler = function(){
								domEvents.removeEventListener.call(select, "inserted", initialSetHandler);
								setChildOptions(select, value === null ? value : select.value);
							};
							domEvents.addEventListener.call(this, "inserted", initialSetHandler);
						}

						// MO handler is only set up **ONCE**
						setupMO(this, function(){
							var value = setData.get.call(this, "attrValueLastVal");
							attr.set(this, "value", value);
							domDispatch.call(this, "change");
						});
					}
					return value;
				},
				test: function(){
					return formElements[this.nodeName];
				}
			},
			values: {
				get: function(){
					return collectSelectedOptions(this);
				},
				set: function(values){
					values = values || [];

					// set new DOM state
					markSelectedOptions(this, values);

					// store new DOM state
					setData.set.call(this, "stickyValues", attr.get(this,"values") );

					// MO handler is only set up **ONCE**
					// TODO: should this be moved into addEventListener?
					setupMO(this, function(){

						// Get the previous sticky state
						var previousValues = setData.get.call(this,
							"stickyValues");

						// Set DOM to previous sticky state
						attr.set(this, "values", previousValues);

						// Get the new result after trying to maintain the sticky state
						var currentValues = setData.get.call(this,
							"stickyValues");

						// If there are changes, trigger a `values` event.
						var changes = diff(previousValues.slice().sort(),
							currentValues.slice().sort());

						if (changes.length) {
							domDispatch.call(this, "values");
						}
					});

					return values;
				},
				addEventListener: function(eventName, handler, aEL){
					var localHandler = function(){
						domDispatch.call(this, "values");
					};

					domEvents.addEventListener.call(this, "change", localHandler);
					aEL.call(this, eventName, handler);

					return function(rEL){
						domEvents.removeEventListener.call(this, "change", localHandler);
						rEL.call(this, eventName, handler);
					};
				}
			}
		},
		// These are elements whos default value we should set.
		defaultValue: {input: true, textarea: true},
		setAttrOrProp: function(el, attrName, val){
			attrName = attrName.toLowerCase();
			var special = attr.special[attrName];
			if(special && special.isBoolean && !val) {
				this.remove(el, attrName);
			} else {
				this.set(el, attrName, val);
			}
		},
		// ## attr.set
		// Set the value an attribute on an element.
		set: function (el, attrName, val) {
			var usingMutationObserver = isOfGlobalDocument(el) && getMutationObserver();
			attrName = attrName.toLowerCase();
			var oldValue;
			// In order to later trigger an event we need to compare the new value to the old value,
			// so here we go ahead and retrieve the old value for browsers that don't have native MutationObservers.
			if (!usingMutationObserver) {
				oldValue = attr.get(el, attrName);
			}

			var newValue;
			var special = attr.special[attrName];
			var setter = special && special.set;
			var test = getSpecialTest(special);

			// First check if this is a special attribute with a setter.
			// Then run the special's test function to make sure we should
			// call its setter, and if so use the setter.
			// Otherwise fallback to setAttribute.
			if(typeof setter === "function" && test.call(el)) {
				// To distinguish calls with explicit undefined, e.g.:
				// - `attr.set(el, "checked")`
				// - `attr.set(el, "checked", undefined)`
				if (arguments.length === 2){
					newValue = setter.call(el);
				} else {
					newValue = setter.call(el, val);
				}
			} else {
				attr.setAttribute(el, attrName, val);
			}

			if (!usingMutationObserver && newValue !== oldValue) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		setSelectValue: function(el, value){
			attr.set(el, "value", value);
		},
		setAttribute: (function(){
			var doc = getDocument();
			if(doc && document.createAttribute) {
				try {
					doc.createAttribute("{}");
				} catch(e) {
					var invalidNodes = {},
						attributeDummy = document.createElement('div');

					return function(el, attrName, val){
						var first = attrName.charAt(0),
							cachedNode,
							node,
							attr;
						if((first === "{" || first === "(" || first === "*") && el.setAttributeNode) {
							cachedNode = invalidNodes[attrName];
							if(!cachedNode) {
								attributeDummy.innerHTML = '<div ' + attrName + '=""></div>';
								cachedNode = invalidNodes[attrName] = attributeDummy.childNodes[0].attributes[0];
							}
							node = cachedNode.cloneNode();
							node.value = val;
							el.setAttributeNode(node);
						} else {
							attr = attrName.split(':');

							if(attr.length !== 1 && namespaces[attr[0]]) {
								el.setAttributeNS(namespaces[attr[0]], attrName, val);
							}
							else {
								el.setAttribute(attrName, val);
							}
						}
					};
				}
			}
			return function(el, attrName, val){
				el.setAttribute(attrName, val);
			};

		})(),
		// ## attr.trigger
		// Used to trigger an "attributes" event on an element. Checks to make sure that someone is listening for the event and then queues a function to be called asynchronously using `setImmediate.
		trigger: function (el, attrName, oldValue) {
			if (setData.get.call(el, "canHasAttributesBindings")) {
				attrName = attrName.toLowerCase();
				return setImmediate(function () {
					domDispatch.call(el, {
						type: "attributes",
						attributeName: attrName,
						target: el,
						oldValue: oldValue,
						bubbles: false
					}, []);
				});
			}
		},
		// ## attr.get
		// Gets the value of an attribute. First checks if the property is an `attr.special` and if so calls the special getter. Otherwise uses `getAttribute` to retrieve the value.
		get: function (el, attrName) {
			attrName = attrName.toLowerCase();

			var special = attr.special[attrName];
			var getter = special && special.get;
			var test = getSpecialTest(special);

			if(typeof getter === "function" && test.call(el)) {
				return getter.call(el);
			} else {
				return el.getAttribute(attrName);
			}
		},
		// ## attr.remove
		// Removes an attribute from an element. First checks attr.special to see if the attribute is special and has a setter. If so calls the setter with `undefined`. Otherwise `removeAttribute` is used.
		// If the attribute previously had a value and the browser doesn't support MutationObservers we then trigger an "attributes" event.
		remove: function (el, attrName) {
			attrName = attrName.toLowerCase();
			var oldValue;
			if (!getMutationObserver()) {
				oldValue = attr.get(el, attrName);
			}

			var special = attr.special[attrName];
			var setter = special && special.set;
			var remover = special && special.remove;
			var test = getSpecialTest(special);

			if(typeof remover === "function" && test.call(el)) {
				remover.call(el);
			} else if(typeof setter === "function" && test.call(el)) {
				setter.call(el, undefined);
			} else {
				el.removeAttribute(attrName);
			}

			if (!getMutationObserver() && oldValue != null) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		// ## attr.has
		// Checks if an element contains an attribute.
		// For browsers that support `hasAttribute`, creates a function that calls hasAttribute, otherwise creates a function that uses `getAttribute` to check that the attribute is not null.
		has: (function () {
			var el = getDocument() && document.createElement('div');
			if (el && el.hasAttribute) {
				return function (el, name) {
					return el.hasAttribute(name);
				};
			} else {
				return function (el, name) {
					return el.getAttribute(name) !== null;
				};
			}
		})()
	};

var oldAddEventListener = domEvents.addEventListener;
domEvents.addEventListener = function(eventName, handler){
	var special = attr.special[eventName];

	if(special && special.addEventListener) {
		var teardown = special.addEventListener.call(this, eventName, handler,
																								oldAddEventListener);
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(!teardowns) {
			setData.set.call(this, "attrTeardowns", teardowns = {});
		}

		if(!teardowns[eventName]) {
			teardowns[eventName] = [];
		}

		teardowns[eventName].push({
			teardown: teardown,
			handler: handler
		});
		return;
	}

	return oldAddEventListener.apply(this, arguments);
};

var oldRemoveEventListener = domEvents.removeEventListener;
domEvents.removeEventListener = function(eventName, handler){
	var special = attr.special[eventName];
	if(special && special.addEventListener) {
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(teardowns && teardowns[eventName]) {
			var eventTeardowns = teardowns[eventName];
			for(var i = 0, len = eventTeardowns.length; i < len; i++) {
				if(eventTeardowns[i].handler === handler) {
					eventTeardowns[i].teardown.call(this, oldRemoveEventListener);
					eventTeardowns.splice(i, 1);
					break;
				}
			}
			if(eventTeardowns.length === 0) {
				delete teardowns[eventName];
			}
		}
		return;
	}
	return oldRemoveEventListener.apply(this, arguments);
};

module.exports = namespace.attr = attr;
