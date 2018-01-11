/*can-util@3.10.19#dom/frag/frag*/
define([
    'require',
    'exports',
    'module',
    'can-globals/document',
    '../fragment/fragment',
    '../../js/each/each',
    '../child-nodes/child-nodes'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document');
        var fragment = require('../fragment/fragment');
        var each = require('../../js/each/each');
        var childNodes = require('../child-nodes/child-nodes');
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
    }(function () {
        return this;
    }(), require, exports, module));
});