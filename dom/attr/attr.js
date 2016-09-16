// # can/util/attr.js
// Central location for attribute changing to occur, used to trigger an
// `attributes` event on elements. This enables the user to do (jQuery example): `$(el).bind("attributes", function(ev) { ... })` where `ev` contains `attributeName` and `oldValue`.
var setImmediate = require("../../js/set-immediate/set-immediate");
var getDocument = require("../document/document");
var global = require("../../js/global/global")();
var isOfGlobalDocument = require("../is-of-global-document/is-of-global-document");
var setData = require("../data/data");
var domEvents = require("../events/events");
var domDispatch = require("../dispatch/dispatch");
var MUTATION_OBSERVER = require("../mutation-observer/mutation-observer");
var each = require("../../js/each/each");

require("../events/attributes/attributes");

var formElements = {"INPUT": true, "TEXTAREA": true, "SELECT": true},
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
			var MO = MUTATION_OBSERVER();
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
	setChildOptions = function(el, value){
		if(value != null) {
			var child = el.firstChild,
				hasSelected = false;
			while(child) {
				if(child.nodeName === "OPTION") {
					if(value === child.value) {
						hasSelected = child.selected = true;
						break;
					}
				}
				child = child.nextSibling;
			}
			if(!hasSelected) {
				el.selectedIndex = -1;
			}
		}
	},
	attr = {
		special: {
			checked: {
				get: function(){
					return this.checked;
				},
				set: function(val){
					var notFalse = !!val || val === undefined || val === "";
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
					var cur = attr.get(this, "focused");
					if(cur !== val) {
						if(val) {
							this.focus();
						} else {
							this.blur();
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
			readonly: {
				get: function(){
					return this.readOnly;
				},
				set: function(val){
					this.readOnly = true;
					return val;
				}
			},
			selected: {
				get: function(){
					return this.selected;
				},
				set: function(val){
					return this.selected = !!val;
				},
				addEventListener: function(eventName, handler, aEL){
					var option = this;
					var select = this.parentNode;
					var lastVal = option.selected;
					var localHandler = function(changeEvent){
						var curVal = option.selected;
						if(curVal !== lastVal) {
							lastVal = curVal;

							domDispatch.call(option, eventName);
						}
					};
					domEvents.addEventListener.call(select, "change", localHandler);
					aEL.call(option, eventName, handler);

					return function(rEL){
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
					if(this.value !== value || nodeName === "option") {
						this.value = value;
					}
					if(attr.defaultValue[nodeName]) {
						this.defaultValue = value;
					}
					if(nodeName === "select") {
						setData.set.call(this, "attrValueLastVal", value);
						setChildOptions(this, this.value);
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
					var values = [];
					var child = this.firstChild;
					while(child) {
						if(child.nodeName === "OPTION" && child.selected) {
							values.push(child.value);
						}
						child = child.nextSibling;
					}
					setData.set.call(this, "valuesLastVal", values);
					return values;
				},
				set: function(values){
					values = values || [];
					var child = this.firstChild;
					while(child) {
						if(child.nodeName === "OPTION") {
							child.selected = values.indexOf(child.value) !== -1;
						}
						child = child.nextSibling;
					}

					setData.set.call(this, "valuesLastVal", values);
					setupMO(this, function(){
						var lastVal = setData.get.call(this, "valuesLastVal");
						attr.set(this, "values", lastVal);
						domDispatch.call(this, "values");
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
			var usingMutationObserver = isOfGlobalDocument(el) && MUTATION_OBSERVER();
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
				newValue = setter.call(el, val);
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
							node;
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
							el.setAttribute(attrName, val);
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
			if (!MUTATION_OBSERVER()) {
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

			if (!MUTATION_OBSERVER() && oldValue != null) {
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

module.exports = exports = attr;
