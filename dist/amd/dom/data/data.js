/*can-util@3.11.0#dom/data/data*/
define([
    'require',
    'exports',
    'module',
    'can-dom-data-state',
    '../mutation-observer/document/document'
], function (require, exports, module) {
    'use strict';
    var domDataState = require('can-dom-data-state');
    var mutationDocument = require('../mutation-observer/document/document');
    var elementSetCount = 0;
    var deleteNode = function () {
        elementSetCount -= 1;
        return domDataState.delete.call(this);
    };
    var cleanupDomData = function (node) {
        if (domDataState.get.call(node) !== undefined) {
            deleteNode.call(node);
        }
        if (elementSetCount === 0) {
            mutationDocument.offAfterRemovedNodes(cleanupDomData);
        }
    };
    module.exports = {
        getCid: domDataState.getCid,
        cid: domDataState.cid,
        expando: domDataState.expando,
        clean: domDataState.clean,
        get: domDataState.get,
        set: function (name, value) {
            if (elementSetCount === 0) {
                mutationDocument.onAfterRemovedNodes(cleanupDomData);
            }
            elementSetCount += domDataState.get.call(this) ? 0 : 1;
            domDataState.set.call(this, name, value);
        },
        delete: deleteNode,
        _getElementSetCount: function () {
            return elementSetCount;
        }
    };
});