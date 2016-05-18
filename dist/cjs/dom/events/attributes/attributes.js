/*can-util@3.0.0-pre.18#dom/events/attributes/attributes*/
var events = require('../events.js');
var isOfGlobalDocument = require('../../is-of-global-document/is-of-global-document.js');
var domData = require('../../data/data.js');
var getMutationObserver = require('../../mutation-observer/mutation-observer.js');
var assign = require('../../../js/assign/assign.js');
var domDispatch = require('../../dispatch/dispatch.js');
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