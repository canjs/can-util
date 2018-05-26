/*can-util@3.11.5#dom/events/attributes/attributes*/
define([
    'require',
    'exports',
    'module',
    '../events',
    '../../is-of-global-document/is-of-global-document',
    '../../data/data',
    'can-globals/mutation-observer',
    'can-assign',
    '../../dispatch/dispatch'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var events = require('../events');
        var isOfGlobalDocument = require('../../is-of-global-document/is-of-global-document');
        var domData = require('../../data/data');
        var getMutationObserver = require('can-globals/mutation-observer');
        var assign = require('can-assign');
        var domDispatch = require('../../dispatch/dispatch');
        var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
        events.addEventListener = function (eventName) {
            if (eventName === 'attributes') {
                var MutationObserver = getMutationObserver();
                if (isOfGlobalDocument(this) && MutationObserver) {
                    var existingObserver = domData.get.call(this, 'canAttributesObserver');
                    if (!existingObserver) {
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
                    }
                } else {
                    domData.set.call(this, 'canHasAttributesBindings', true);
                }
            }
            return originalAdd.apply(this, arguments);
        };
        events.removeEventListener = function (eventName) {
            if (eventName === 'attributes') {
                var MutationObserver = getMutationObserver();
                var observer;
                if (isOfGlobalDocument(this) && MutationObserver) {
                    observer = domData.get.call(this, 'canAttributesObserver');
                    if (observer && observer.disconnect) {
                        observer.disconnect();
                        domData.clean.call(this, 'canAttributesObserver');
                    }
                } else {
                    domData.clean.call(this, 'canHasAttributesBindings');
                }
            }
            return originalRemove.apply(this, arguments);
        };
    }(function () {
        return this;
    }(), require, exports, module));
});