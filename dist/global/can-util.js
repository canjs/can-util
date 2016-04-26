/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				doEval(__load.source, global);
			}
		};
	});
}
)({},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*can-util@3.0.0-pre.6#js/is-array/is-array*/
define('can-util/js/is-array/is-array', function (require, exports, module) {
    module.exports = function (arr) {
        return Array.isArray(arr);
    };
});
/*can-util@3.0.0-pre.6#js/is-function/is-function*/
define('can-util/js/is-function/is-function', function (require, exports, module) {
    var isFunction = function () {
        if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
            return function (value) {
                return Object.prototype.toString.call(value) === '[object Function]';
            };
        }
        return function (value) {
            return typeof value === 'function';
        };
    }();
    module.exports = isFunction;
});
/*can-util@3.0.0-pre.6#js/is-plain-object/is-plain-object*/
define('can-util/js/is-plain-object/is-plain-object', function (require, exports, module) {
    var core_hasOwn = Object.prototype.hasOwnProperty;
    function isWindow(obj) {
        return obj !== null && obj == obj.window;
    }
    function isPlainObject(obj) {
        if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
            return false;
        }
        try {
            if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
        } catch (e) {
            return false;
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || core_hasOwn.call(obj, key);
    }
    module.exports = isPlainObject;
});
/*can-util@3.0.0-pre.6#js/deep-extend/deep-extend*/
define('can-util/js/deep-extend/deep-extend', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var isFunction = require('can-util/js/is-function/is-function');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    function extend() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== 'object' && !isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
    module.exports = extend;
});
/*can-util@3.0.0-pre.6#js/global/global*/
define('can-util/js/global/global', function (require, exports, module) {
    module.exports = function () {
        return typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : global;
    };
});
/*can-util@3.0.0-pre.6#js/set-immediate/set-immediate*/
define('can-util/js/set-immediate/set-immediate', function (require, exports, module) {
    var global = require('can-util/js/global/global')();
    module.exports = global.setImmediate || function (cb) {
        return setTimeout(cb, 0);
    };
});
/*can-util@3.0.0-pre.6#dom/document/document*/
define('can-util/dom/document/document', function (require, exports, module) {
    var global = require('can-util/js/global/global');
    var setDocument;
    module.exports = function (setDoc) {
        if (setDoc) {
            setDocument = setDoc;
        }
        return setDocument || global().document;
    };
});
/*can-util@3.0.0-pre.6#dom/is-of-global-document/is-of-global-document*/
define('can-util/dom/is-of-global-document/is-of-global-document', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document');
    module.exports = function (el) {
        return (el.ownerDocument || el) === getDocument();
    };
});
/*can-util@3.0.0-pre.6#js/is-empty-object/is-empty-object*/
define('can-util/js/is-empty-object/is-empty-object', function (require, exports, module) {
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});
/*can-util@3.0.0-pre.6#dom/data/data*/
define('can-util/dom/data/data', function (require, exports, module) {
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var data = {};
    var expando = 'can' + new Date();
    var uuid = 0;
    var setData = function (name, value) {
        var id = this[expando] || (this[expando] = ++uuid), store = data[id] || (data[id] = {});
        if (name !== undefined) {
            store[name] = value;
        }
        return store;
    };
    module.exports = {
        getCid: function () {
            return this[expando];
        },
        cid: function () {
            return this[expando] || (this[expando] = ++uuid);
        },
        expando: expando,
        clean: function (prop) {
            var id = this[expando];
            delete data[id][prop];
            if (isEmptyObject(data[id])) {
                delete data[id];
            }
        },
        get: function (name) {
            var id = this[expando], store = id && data[id];
            return name === undefined ? store || setData(this) : store && store[name];
        },
        set: setData
    };
});
/*can-util@3.0.0-pre.6#js/assign/assign*/
define('can-util/js/assign/assign', function (require, exports, module) {
    module.exports = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-util@3.0.0-pre.6#dom/dispatch/dispatch*/
define('can-util/dom/dispatch/dispatch', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var _document = require('can-util/dom/document/document');
    module.exports = function (event, args, bubbles) {
        var doc = _document();
        var ev = doc.createEvent('HTMLEvents');
        var isString = typeof event === 'string';
        ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);
        if (!isString) {
            assign(ev, event);
        }
        ev.args = args;
        return this.dispatchEvent(ev);
    };
});
/*can-util@3.0.0-pre.6#dom/events/events*/
define('can-util/dom/events/events', function (require, exports, module) {
    module.exports = {
        addEventListener: function () {
            this.addEventListener.apply(this, arguments);
        },
        removeEventListener: function () {
            this.removeEventListener.apply(this, arguments);
        },
        canAddEventListener: function () {
            return this.nodeName && (this.nodeType === 1 || this.nodeType === 9) || this === window;
        }
    };
});
/*can-util@3.0.0-pre.6#dom/mutation-observer/mutation-observer*/
define('can-util/dom/mutation-observer/mutation-observer', function (require, exports, module) {
    var global = require('can-util/js/global/global')();
    var setMutationObserver;
    module.exports = function (setMO) {
        if (setMO !== undefined) {
            setMutationObserver = setMO;
        }
        return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
    };
});
/*can-util@3.0.0-pre.6#dom/events/attributes/attributes*/
define('can-util/dom/events/attributes/attributes', function (require, exports, module) {
    var events = require('can-util/dom/events/events');
    var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
    var domData = require('can-util/dom/data/data');
    var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
    var assign = require('can-util/js/assign/assign');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
    events.addEventListener = function (eventName) {
        if (eventName === 'attributes') {
            var MutationObserver = getMutationObserver();
            if (isOfGlobalDocument(this) && MutationObserver) {
                var self = this;
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        var copy = assign({}, mutation);
                        domDispatch.call(self, copy, [], false);
                    });
                });
                observer.observe(this, {
                    attributes: true,
                    attributeOldValue: true
                });
                domData.set.call(this, 'canAttributesObserver', observer);
            } else {
                domData.set.call(this, 'canHasAttributesBindings', true);
            }
        }
        return originalAdd.apply(this, arguments);
    };
    events.removeEventListener = function (eventName) {
        if (eventName === 'attributes') {
            var MutationObserver = getMutationObserver();
            if (isOfGlobalDocument(this) && MutationObserver) {
                domData.get.call(this, 'canAttributesObserver').disconnect();
                domData.clean.call(this, 'canAttributesObserver');
            } else {
                domData.clean.call(this, 'canHasAttributesBindings');
            }
        }
        return originalRemove.apply(this, arguments);
    };
});
/*can-util@3.0.0-pre.6#dom/attr/attr*/
define('can-util/dom/attr/attr', function (require, exports, module) {
    var setImmediate = require('can-util/js/set-immediate/set-immediate');
    var getDocument = require('can-util/dom/document/document');
    var global = require('can-util/js/global/global')();
    var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
    var isArray = require('can-util/js/is-array/is-array');
    var setData = require('can-util/dom/data/data');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    require('can-util/dom/events/attributes/attributes');
    var formElements = {
            'input': true,
            'textarea': true,
            'select': true
        }, hasProperty = function (el, attrName) {
            return attrName in el || getDocument() && formElements[el.nodeName.toLowerCase()];
        }, attr = {
            MutationObserver: global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver,
            map: {
                'class': function (el, val) {
                    val = val || '';
                    if (el.namespaceURI === 'http://www.w3.org/2000/svg') {
                        el.setAttribute('class', val);
                    } else {
                        el.className = val;
                    }
                    return val;
                },
                'value': 'value',
                'innertext': 'innerText',
                'innerhtml': 'innerHTML',
                'textcontent': 'textContent',
                'for': 'htmlFor',
                'checked': true,
                'disabled': true,
                'readonly': function (el, val) {
                    el.readOnly = true;
                    return val;
                },
                'required': true,
                src: function (el, val) {
                    if (val == null || val === '') {
                        el.removeAttribute('src');
                        return null;
                    } else {
                        el.setAttribute('src', val);
                        return val;
                    }
                },
                style: function () {
                    var el = global.document && getDocument().createElement('div');
                    if (el && el.style && 'cssText' in el.style) {
                        return function (el, val) {
                            return el.style.cssText = val || '';
                        };
                    } else {
                        return function (el, val) {
                            return el.setAttribute('style', val);
                        };
                    }
                }()
            },
            defaultValue: [
                'input',
                'textarea'
            ],
            setAttrOrProp: function (el, attrName, val) {
                attrName = attrName.toLowerCase();
                var prop = attr.map[attrName];
                if (prop === true && !val) {
                    this.remove(el, attrName);
                } else {
                    this.set(el, attrName, val);
                }
            },
            setSelectValue: function (el, val) {
                if (val != null) {
                    var options = el.getElementsByTagName('option');
                    for (var i = 0; i < options.length; i++) {
                        if (val == options[i].value) {
                            options[i].selected = true;
                            return;
                        }
                    }
                }
                el.selectedIndex = -1;
            },
            set: function (el, attrName, val) {
                var usingMutationObserver = isOfGlobalDocument(el) && attr.MutationObserver;
                attrName = attrName.toLowerCase();
                var oldValue;
                if (!usingMutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var prop = attr.map[attrName], newValue;
                if (typeof prop === 'function') {
                    newValue = prop(el, val);
                } else if (prop === true && hasProperty(el, attrName)) {
                    newValue = el[attrName] = true;
                    if (attrName === 'checked' && el.type === 'radio') {
                        if (isArray((el.nodeName + '').toLowerCase(), attr.defaultValue) >= 0) {
                            el.defaultChecked = true;
                        }
                    }
                } else if (typeof prop === 'string' && hasProperty(el, prop)) {
                    newValue = val;
                    if (el[prop] !== val || el.nodeName.toUpperCase() === 'OPTION') {
                        el[prop] = val;
                    }
                    if (prop === 'value' && attr.defaultValue.indexOf((el.nodeName + '').toLowerCase()) >= 0) {
                        el.defaultValue = val;
                    }
                } else {
                    attr.setAttribute(el, attrName, val);
                }
                if (!usingMutationObserver && newValue !== oldValue) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            setAttribute: function () {
                var doc = getDocument();
                if (doc && document.createAttribute) {
                    try {
                        doc.createAttribute('{}');
                    } catch (e) {
                        var invalidNodes = {}, attributeDummy = document.createElement('div');
                        return function (el, attrName, val) {
                            var first = attrName.charAt(0), cachedNode, node;
                            if ((first === '{' || first === '(' || first === '*') && el.setAttributeNode) {
                                cachedNode = invalidNodes[attrName];
                                if (!cachedNode) {
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
                return function (el, attrName, val) {
                    el.setAttribute(attrName, val);
                };
            }(),
            trigger: function (el, attrName, oldValue) {
                if (setData.get(el, 'canHasAttributesBindings')) {
                    attrName = attrName.toLowerCase();
                    return setImmediate(function () {
                        domDispatch.call(el, {
                            type: 'attributes',
                            attributeName: attrName,
                            target: el,
                            oldValue: oldValue,
                            bubbles: false
                        }, []);
                    });
                }
            },
            get: function (el, attrName) {
                attrName = attrName.toLowerCase();
                var prop = attr.map[attrName];
                if (typeof prop === 'string' && hasProperty(el, prop)) {
                    return el[prop];
                } else if (prop === true && hasProperty(el, attrName)) {
                    return el[attrName];
                }
                return el.getAttribute(attrName);
            },
            remove: function (el, attrName) {
                attrName = attrName.toLowerCase();
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var setter = attr.map[attrName];
                if (typeof setter === 'function') {
                    setter(el, undefined);
                }
                if (setter === true && hasProperty(el, attrName)) {
                    el[attrName] = false;
                } else if (typeof setter === 'string' && hasProperty(el, setter)) {
                    el[setter] = '';
                } else {
                    el.removeAttribute(attrName);
                }
                if (!attr.MutationObserver && oldValue != null) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            has: function () {
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
            }()
        };
    module.exports = exports = attr;
});
/*can-util@3.0.0-pre.6#dom/child-nodes/child-nodes*/
define('can-util/dom/child-nodes/child-nodes', function (require, exports, module) {
    function childNodes(node) {
        var childNodes = node.childNodes;
        if ('length' in childNodes) {
            return childNodes;
        } else {
            var cur = node.firstChild;
            var nodes = [];
            while (cur) {
                nodes.push(cur);
                cur = cur.nextSibling;
            }
            return nodes;
        }
    }
    module.exports = childNodes;
});
/*can-util@3.0.0-pre.6#dom/class-name/class-name*/
define('can-util/dom/class-name/class-name', function (require, exports, module) {
    var has = function (className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    };
    module.exports = {
        has: has,
        add: function (className) {
            if (this.classList) {
                this.classList.add(className);
            } else if (!has.call(this, className)) {
                this.className += ' ' + className;
            }
        },
        remove: function (className) {
            if (this.classList) {
                this.classList.remove(className);
            } else if (has.call(this, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                this.className = this.className.replace(reg, ' ');
            }
        }
    };
});
/*can-util@3.0.0-pre.6#dom/contains/contains*/
define('can-util/dom/contains/contains', function (require, exports, module) {
    module.exports = function (child) {
        return this.contains(child);
    };
});
/*can-util@3.0.0-pre.6#dom/fragment/fragment*/
define('can-util/dom/fragment/fragment', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document'), childNodes = require('can-util/dom/child-nodes/child-nodes');
    var fragmentRE = /^\s*<(\w+)[^>]*>/, toString = {}.toString, fragment = function (html, name, doc) {
            if (name === undefined) {
                name = fragmentRE.test(html) && RegExp.$1;
            }
            if (html && toString.call(html.replace) === '[object Function]') {
                html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
            }
            var container = doc.createElement('div'), temp = doc.createElement('div');
            if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
                temp.innerHTML = '<table>' + html + '</table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else if (name === 'col') {
                temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'tr') {
                temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'td' || name === 'th') {
                temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
            } else if (name === 'option') {
                temp.innerHTML = '<select>' + html + '</select>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else {
                container.innerHTML = '' + html;
            }
            var tmp = {}, children = childNodes(container);
            tmp.length = children.length;
            for (var i = 0; i < children.length; i++) {
                tmp[i] = children[i];
            }
            return [].slice.call(tmp);
        };
    var buildFragment = function (html, doc) {
        if (html && html.nodeType === 11) {
            return html;
        }
        if (!doc) {
            doc = getDocument();
        } else if (doc.length) {
            doc = doc[0];
        }
        var parts = fragment(html, undefined, doc), frag = (doc || document).createDocumentFragment();
        for (var i = 0, length = parts.length; i < length; i++) {
            frag.appendChild(parts[i]);
        }
        return frag;
    };
    module.exports = buildFragment;
});
/*can-util@3.0.0-pre.6#js/is-array-like/is-array-like*/
define('can-util/js/is-array-like/is-array-like', function (require, exports, module) {
    function isArrayLike(obj) {
        var type = typeof obj;
        if (type === 'string') {
            return true;
        }
        var length = obj && type !== 'boolean' && typeof obj !== 'number' && 'length' in obj && obj.length;
        return typeof arr !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    }
    module.exports = isArrayLike;
});
/*can-util@3.0.0-pre.6#js/each/each*/
define('can-util/js/each/each', function (require, exports, module) {
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    function each(elements, callback, context) {
        var i = 0, key, len, item;
        if (elements) {
            if (isArrayLike(elements)) {
                for (len = elements.length; i < len; i++) {
                    item = elements[i];
                    if (callback.call(context || item, item, i, elements) === false) {
                        break;
                    }
                }
            } else if (typeof elements === 'object') {
                for (key in elements) {
                    if (Object.prototype.hasOwnProperty.call(elements, key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                        break;
                    }
                }
            }
        }
        return elements;
    }
    module.exports = each;
});
/*can-util@3.0.0-pre.6#dom/frag/frag*/
define('can-util/dom/frag/frag', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document');
    var fragment = require('can-util/dom/fragment/fragment');
    var each = require('can-util/js/each/each');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var makeFrag = function (item, doc) {
        var document = doc || getDocument();
        var frag;
        if (!item || typeof item === 'string') {
            frag = fragment(item == null ? '' : '' + item, document);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else if (item.nodeType === 11) {
            return item;
        } else if (typeof item.nodeType === 'number') {
            frag = document.createDocumentFragment();
            frag.appendChild(item);
            return frag;
        } else if (typeof item.length === 'number') {
            frag = document.createDocumentFragment();
            each(item, function (item) {
                frag.appendChild(makeFrag(item));
            });
            if (!childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else {
            frag = fragment('' + item, document);
            if (!childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        }
    };
    module.exports = makeFrag;
});
/*can-util@3.0.0-pre.6#dom/matches/matches*/
define('can-util/dom/matches/matches', function (require, exports, module) {
    var matchesMethod = function (element) {
        return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
    };
    module.exports = function () {
        return matchesMethod(this).apply(this, arguments);
    };
});
/*can-util@3.0.0-pre.6#js/make-array/make-array*/
define('can-util/js/make-array/make-array', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    function makeArray(arr) {
        var ret = [];
        each(arr, function (a, i) {
            ret[i] = a;
        });
        return ret;
    }
    module.exports = makeArray;
});
/*can-util@3.0.0-pre.6#dom/mutate/mutate*/
define('can-util/dom/mutate/mutate', function (require, exports, module) {
    var makeArray = require('can-util/js/make-array/make-array');
    var setImmediate = require('can-util/js/set-immediate/set-immediate');
    var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var domContains = require('can-util/dom/contains/contains');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var mutatedElements;
    var checks = {
        inserted: function (root, elem) {
            return domContains.call(root, elem);
        },
        removed: function (root, elem) {
            return !domContains.call(root, elem);
        }
    };
    var fireOn = function (elems, root, check, event) {
        if (!elems.length) {
            return;
        }
        var children;
        for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
            if (elem.getElementsByTagName && check(root, elem)) {
                children = makeArray(elem.getElementsByTagName('*'));
                domDispatch.call(elem, event, [], false);
                for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                    domDispatch.call(child, event, [], false);
                }
            }
        }
    };
    var fireMutations = function () {
        var mutations = mutatedElements;
        mutatedElements = null;
        var firstElement = mutations[0][1][0];
        var doc = firstElement.ownerDocument || firstElement;
        var root = doc.contains ? doc : doc.body;
        mutations.forEach(function (mutation) {
            fireOn(mutation[1], root, checks[mutation[0]], mutation[0]);
        });
    };
    var mutated = function (elements, type) {
        if (!getMutationObserver()) {
            if (!mutatedElements) {
                mutatedElements = [];
                setImmediate(fireMutations);
            }
            mutatedElements.push([
                type,
                elements
            ]);
        }
    };
    module.exports = {
        appendChild: function (child) {
            if (getMutationObserver()) {
                this.appendChild(child);
            } else {
                var children;
                if (child.nodeType === 11) {
                    children = makeArray(childNodes(child));
                } else {
                    children = [child];
                }
                this.appendChild(child);
                mutated(children, 'inserted');
            }
        },
        insertBefore: function (child, ref, document) {
            if (getMutationObserver()) {
                this.insertBefore(child, ref);
            } else {
                var children;
                if (child.nodeType === 11) {
                    children = makeArray(childNodes(child));
                } else {
                    children = [child];
                }
                this.insertBefore(child, ref);
                mutated(children, 'inserted');
            }
        },
        removeChild: function (child) {
            if (getMutationObserver()) {
                this.removeChild(child);
            } else {
                this.removeChild(child);
                mutated([child], 'removed');
            }
        },
        replaceChild: function (newChild, oldChild) {
            if (getMutationObserver()) {
                this.replaceChild(newChild, oldChild);
            } else {
                var children;
                if (newChild.nodeType === 11) {
                    children = makeArray(childNodes(newChild));
                } else {
                    children = [newChild];
                }
                this.replaceChild(newChild, oldChild);
                mutated([oldChild], 'removed');
                mutated(children, 'inserted');
            }
        },
        inserted: function (elements) {
            mutated(elements, 'inserted');
        },
        removed: function (elements) {
            mutated(elements, 'removed');
        }
    };
});
/*can-util@3.0.0-pre.6#dom/dom*/
define('can-util/dom/dom', function (require, exports, module) {
    module.exports = {
        attr: require('can-util/dom/attr/attr'),
        childNodes: require('can-util/dom/child-nodes/child-nodes'),
        className: require('can-util/dom/class-name/class-name'),
        contains: require('can-util/dom/contains/contains'),
        data: require('can-util/dom/data/data'),
        dispatch: require('can-util/dom/dispatch/dispatch'),
        document: require('can-util/dom/document/document'),
        events: require('can-util/dom/events/events'),
        frag: require('can-util/dom/frag/frag'),
        fragment: require('can-util/dom/fragment/fragment'),
        isOfGlobalDocument: require('can-util/dom/is-of-global-document/is-of-global-document'),
        matches: require('can-util/dom/matches/matches'),
        mutate: require('can-util/dom/mutate/mutate'),
        mutationObserver: require('can-util/dom/mutation-observer/mutation-observer')
    };
});
/*can-util@3.0.0-pre.6#js/cid/cid*/
define('can-util/js/cid/cid', function (require, exports, module) {
    var cid = 0;
    module.exports = function (object, name) {
        if (!object._cid) {
            cid++;
            object._cid = (name || '') + cid;
        }
        return object._cid;
    };
});
/*can-util@3.0.0-pre.6#js/dev/dev*/
define('can-util/js/dev/dev', function (require, exports, module) {
});
/*can-util@3.0.0-pre.6#js/diff/diff*/
define('can-util/js/diff/diff', function (require, exports, module) {
    var slice = [].slice;
    module.exports = exports = function (oldList, newList) {
        var oldIndex = 0, newIndex = 0, oldLength = oldList.length, newLength = newList.length, patches = [];
        while (oldIndex < oldLength && newIndex < newLength) {
            var oldItem = oldList[oldIndex], newItem = newList[newIndex];
            if (oldItem === newItem) {
                oldIndex++;
                newIndex++;
                continue;
            }
            if (newIndex + 1 < newLength && newList[newIndex + 1] === oldItem) {
                patches.push({
                    index: newIndex,
                    deleteCount: 0,
                    insert: [newList[newIndex]]
                });
                oldIndex++;
                newIndex += 2;
                continue;
            } else if (oldIndex + 1 < oldLength && oldList[oldIndex + 1] === newItem) {
                patches.push({
                    index: newIndex,
                    deleteCount: 1,
                    insert: []
                });
                oldIndex += 2;
                newIndex++;
                continue;
            } else {
                patches.push({
                    index: newIndex,
                    deleteCount: oldLength - oldIndex,
                    insert: slice.call(newList, newIndex)
                });
                return patches;
            }
        }
        if (newIndex === newLength && oldIndex === oldLength) {
            return patches;
        }
        patches.push({
            index: newIndex,
            deleteCount: oldLength - oldIndex,
            insert: slice.call(newList, newIndex)
        });
        return patches;
    };
});
/*can-util@3.0.0-pre.6#js/import/import*/
define('can-util/js/import/import', function (require, exports, module) {
    module.exports = function (moduleName, parentName) {
        var deferred = new can.Deferred();
        if (typeof window.System === 'object' && can.isFunction(window.System['import'])) {
            window.System['import'](moduleName, { name: parentName }).then(can.proxy(deferred.resolve, deferred), can.proxy(deferred.reject, deferred));
        } else if (window.define && window.define.amd) {
            window.require([moduleName], function (value) {
                deferred.resolve(value);
            });
        } else if (window.require) {
            deferred.resolve(window.require(moduleName));
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    };
});
/*can-util@3.0.0-pre.6#js/is-browser-window/is-browser-window*/
define('can-util/js/is-browser-window/is-browser-window', function (require, exports, module) {
    module.exports = function () {
        return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
    };
});
/*can-util@3.0.0-pre.6#js/is-node/is-node*/
define('can-util/js/is-node/is-node', function (require, exports, module) {
    module.exports = function () {
        return typeof process === 'object' && {}.toString.call(process) === '[object process]';
    };
});
/*can-util@3.0.0-pre.6#js/is-promise/is-promise*/
define('can-util/js/is-promise/is-promise', function (require, exports, module) {
    var isFunction = require('can-util/js/is-function/is-function');
    module.exports = function (obj) {
        return !!obj && (typeof window !== 'undefined' && window.Promise && obj instanceof Promise || isFunction(obj.then) && isFunction(obj.catch));
    };
});
/*can-util@3.0.0-pre.6#js/is-string/is-string*/
define('can-util/js/is-string/is-string', function (require, exports, module) {
    function isString(obj) {
        return typeof obj === 'string';
    }
    module.exports = isString;
});
/*can-util@3.0.0-pre.6#js/is-web-worker/is-web-worker*/
define('can-util/js/is-web-worker/is-web-worker', function (require, exports, module) {
    module.exports = function () {
        return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
    };
});
/*can-util@3.0.0-pre.6#js/join-uris/join-uris*/
define('can-util/js/join-uris/join-uris', function (require, exports, module) {
    var parseURI = function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    };
    module.exports = function (base, href) {
        function removeDotSegments(input) {
            var output = [];
            input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
            return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
        }
        href = parseURI(href || '');
        base = parseURI(base || '');
        return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
    };
});
/*can-util@3.0.0-pre.6#js/last/last*/
define('can-util/js/last/last', function (require, exports, module) {
    module.exports = function (arr) {
        return arr && arr[arr.length - 1];
    };
});
/*can-util@3.0.0-pre.6#js/string/string*/
define('can-util/js/string/string', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, getNext = function (obj, prop, add) {
            var result = obj[prop];
            if (result === undefined && add === true) {
                result = obj[prop] = {};
            }
            return result;
        }, isContainer = function (current) {
            return /^f|^o/.test(typeof current);
        }, convertBadValues = function (content) {
            var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
            return '' + (isInvalid ? '' : content);
        };
    var string = {
        esc: function (content) {
            return convertBadValues(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(strQuote, '&#34;').replace(strSingleQuote, '&#39;');
        },
        getObject: function (name, roots, add) {
            var parts = name ? name.split('.') : [], length = parts.length, current, r = 0, i, container, rootsLength;
            roots = isArray(roots) ? roots : [roots || window];
            rootsLength = roots.length;
            if (!length) {
                return roots[0];
            }
            for (r; r < rootsLength; r++) {
                current = roots[r];
                container = undefined;
                for (i = 0; i < length && isContainer(current); i++) {
                    container = current;
                    current = getNext(container, parts[i]);
                }
                if (container !== undefined && current !== undefined) {
                    break;
                }
            }
            if (add === false && current !== undefined) {
                delete container[parts[i - 1]];
            }
            if (add === true && current === undefined) {
                current = roots[0];
                for (i = 0; i < length && isContainer(current); i++) {
                    current = getNext(current, parts[i], true);
                }
            }
            return current;
        },
        capitalize: function (s, cache) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        camelize: function (str) {
            return convertBadValues(str).replace(strHyphenMatch, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },
        hyphenate: function (str) {
            return convertBadValues(str).replace(strCamelMatch, function (str, offset) {
                return str.charAt(0) + '-' + str.charAt(1).toLowerCase();
            });
        },
        underscore: function (s) {
            return s.replace(strColons, '/').replace(strWords, '$1_$2').replace(strLowUp, '$1_$2').replace(strDash, '_').toLowerCase();
        },
        sub: function (str, data, remove) {
            var obs = [];
            str = str || '';
            obs.push(str.replace(strReplacer, function (whole, inside) {
                var ob = string.getObject(inside, data, remove === true ? false : undefined);
                if (ob === undefined || ob === null) {
                    obs = null;
                    return '';
                }
                if (isContainer(ob) && obs) {
                    obs.push(ob);
                    return '';
                }
                return '' + ob;
            }));
            return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
        },
        replacer: strReplacer,
        undHash: strUndHash
    };
    module.exports = string;
});
/*can-util@3.0.0-pre.6#js/types/types*/
define('can-util/js/types/types', function (require, exports, module) {
    var isPromise = require('can-util/js/is-promise/is-promise');
    var types = {
        isMapLike: function () {
            return false;
        },
        isListLike: function () {
            return false;
        },
        isPromise: function (obj) {
            return isPromise(obj);
        },
        isConstructor: function () {
            return false;
        },
        isCallableForValue: function (obj) {
            return typeof obj === 'function' && !types.isConstructor(obj);
        },
        isCompute: function (obj) {
            return obj && obj.isComputed;
        }
    };
    module.exports = types;
});
/*can-util@3.0.0-pre.6#js/js*/
define('can-util/js/js', function (require, exports, module) {
    module.exports = {
        assign: require('can-util/js/assign/assign'),
        cid: require('can-util/js/cid/cid'),
        deepExtend: require('can-util/js/deep-extend/deep-extend'),
        dev: require('can-util/js/dev/dev'),
        diff: require('can-util/js/diff/diff'),
        each: require('can-util/js/each/each'),
        global: require('can-util/js/global/global'),
        import: require('can-util/js/import/import'),
        isArray: require('can-util/js/is-array/is-array'),
        isArrayLike: require('can-util/js/is-array-like/is-array-like'),
        isBrowserWindow: require('can-util/js/is-browser-window/is-browser-window'),
        isEmptyObject: require('can-util/js/is-empty-object/is-empty-object'),
        isFunction: require('can-util/js/is-function/is-function'),
        isNode: require('can-util/js/is-node/is-node'),
        isPlainObject: require('can-util/js/is-plain-object/is-plain-object'),
        isPromise: require('can-util/js/is-promise/is-promise'),
        isString: require('can-util/js/is-string/is-string'),
        isWebWorker: require('can-util/js/is-web-worker/is-web-worker'),
        joinURIs: require('can-util/js/join-uris/join-uris'),
        last: require('can-util/js/last/last'),
        makeArra: require('can-util/js/make-array/make-array'),
        setImmediate: require('can-util/js/set-immediate/set-immediate'),
        string: require('can-util/js/string/string'),
        types: require('can-util/js/types/types')
    };
});
/*can-util@3.0.0-pre.6#can-util*/
define('can-util', function (require, exports, module) {
    var extend = require('can-util/js/deep-extend/deep-extend');
    module.exports = extend({}, require('can-util/dom/dom'), require('can-util/js/js'));
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();