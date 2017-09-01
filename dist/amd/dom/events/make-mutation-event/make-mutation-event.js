/*can-util@3.9.9#dom/events/make-mutation-event/make-mutation-event*/
define([
    'require',
    'exports',
    'module',
    '../events',
    '../../data/data',
    '../../mutation-observer/mutation-observer',
    '../../dispatch/dispatch',
    '../../mutation-observer/document/document',
    '../../document/document',
    '../../../js/cid-map/cid-map',
    '../../../js/string/string',
    '../../is-of-global-document/is-of-global-document'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var events = require('../events');
        var domData = require('../../data/data');
        var getMutationObserver = require('../../mutation-observer/mutation-observer');
        var domDispatch = require('../../dispatch/dispatch');
        var mutationDocument = require('../../mutation-observer/document/document');
        var getDocument = require('../../document/document');
        var CIDMap = require('../../../js/cid-map/cid-map');
        var string = require('../../../js/string/string');
        require('../../is-of-global-document/is-of-global-document');
        module.exports = function (specialEventName, mutationNodesProperty) {
            var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
            events.addEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (!specialEventData) {
                        specialEventData = {
                            handler: function (mutatedNode) {
                                if (specialEventData.nodeIdsRespondingToInsert.has(mutatedNode)) {
                                    domDispatch.call(mutatedNode, specialEventName, [], false);
                                    specialEventData.nodeIdsRespondingToInsert.delete(mutatedNode);
                                }
                            },
                            nodeIdsRespondingToInsert: new CIDMap()
                        };
                        mutationDocument['on' + string.capitalize(mutationNodesProperty)](specialEventData.handler);
                        domData.set.call(documentElement, specialEventName + 'Data', specialEventData);
                    }
                    var count = specialEventData.nodeIdsRespondingToInsert.get(this) || 0;
                    specialEventData.nodeIdsRespondingToInsert.set(this, count + 1);
                }
                return originalAdd.apply(this, arguments);
            };
            events.removeEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (specialEventData) {
                        var newCount = specialEventData.nodeIdsRespondingToInsert.get(this) - 1;
                        if (newCount) {
                            specialEventData.nodeIdsRespondingToInsert.set(this, newCount);
                        } else {
                            specialEventData.nodeIdsRespondingToInsert.delete(this);
                        }
                        if (!specialEventData.nodeIdsRespondingToInsert.size) {
                            mutationDocument['off' + string.capitalize(mutationNodesProperty)](specialEventData.handler);
                            domData.clean.call(documentElement, specialEventName + 'Data');
                        }
                    }
                }
                return originalRemove.apply(this, arguments);
            };
        };
    }(function () {
        return this;
    }()));
});