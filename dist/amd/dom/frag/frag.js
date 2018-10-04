/*can-util@3.13.0#dom/frag/frag*/
define([
    'require',
    'exports',
    'module',
    'can-globals/document',
    '../fragment/fragment',
    '../../js/each/each',
    '../child-nodes/child-nodes',
    'can-namespace',
    'can-symbol'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document');
        var fragment = require('../fragment/fragment');
        var each = require('../../js/each/each');
        var childNodes = require('../child-nodes/child-nodes');
        var namespace = require('can-namespace');
        var canSymbol = require('can-symbol');
        var toDOMSymbol = canSymbol.for('can.toDOM');
        var makeFrag = function (item, doc) {
            var document = doc || getDocument();
            var frag;
            if (!item || typeof item === 'string') {
                frag = fragment(item == null ? '' : '' + item, document);
                if (!frag.firstChild) {
                    frag.appendChild(document.createTextNode(''));
                }
                return frag;
            } else if (typeof item[toDOMSymbol] === 'function') {
                return makeFrag(item[toDOMSymbol]());
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
        module.exports = namespace.frag = makeFrag;
    }(function () {
        return this;
    }(), require, exports, module));
});