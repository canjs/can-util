/*can-util@3.9.8#dom/data/data*/
define([
    'require',
    'exports',
    'module',
    './core',
    '../mutation-observer/document/document'
], function (require, exports, module) {
    'use strict';
    var domDataCore = require('./core');
    var mutationDocument = require('../mutation-observer/document/document');
    var deleteNode = function () {
        return domDataCore.delete.call(this);
    };
    var elementSetCount = 0;
    var cleanupDomData = function (node) {
        elementSetCount -= deleteNode.call(node) ? 1 : 0;
        if (elementSetCount === 0) {
            mutationDocument.offAfterRemovedNodes(cleanupDomData);
        }
    };
    module.exports = {
        getCid: domDataCore.getCid,
        cid: domDataCore.cid,
        expando: domDataCore.expando,
        clean: domDataCore.clean,
        get: domDataCore.get,
        set: function (name, value) {
            if (elementSetCount === 0) {
                mutationDocument.onAfterRemovedNodes(cleanupDomData);
            }
            elementSetCount += domDataCore.set.call(this, name, value) ? 1 : 0;
        },
        delete: deleteNode
    };
});