/*can-util@3.0.0-pre.18#dom/attr/attr*/
var setImmediate = require('../../js/set-immediate/set-immediate.js');
var getDocument = require('../document/document.js');
var global = require('../../js/global/global.js')();
var isOfGlobalDocument = require('../is-of-global-document/is-of-global-document.js');
var isArray = require('../../js/is-array/is-array.js');
var setData = require('../data/data.js');
var domDispatch = require('../dispatch/dispatch.js');
require('../events/attributes/attributes.js');
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