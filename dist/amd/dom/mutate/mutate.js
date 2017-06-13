/*can-util@3.9.0-pre.0#dom/mutate/mutate*/
define(function (require, exports, module) {
    'use strict';
    var makeArray = require('../../js/make-array/make-array');
    var setImmediate = require('../../js/set-immediate/set-immediate');
    var CID = require('can-cid');
    var getMutationObserver = require('../mutation-observer/mutation-observer');
    var childNodes = require('../child-nodes/child-nodes');
    var domContains = require('../contains/contains');
    var domDispatch = require('../dispatch/dispatch');
    var DOCUMENT = require('../document/document');
    var domData = require('../data/data');
    var mutatedElements;
    var checks = {
        inserted: function (root, elem) {
            return domContains.call(root, elem);
        },
        removed: function (root, elem) {
            return !domContains.call(root, elem);
        }
    };
    var fireOn = function (elems, root, check, event, dispatched) {
        if (!elems.length) {
            return;
        }
        var children, cid;
        for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
            cid = CID(elem);
            if (elem.getElementsByTagName && check(root, elem) && !dispatched[cid]) {
                dispatched[cid] = true;
                children = makeArray(elem.getElementsByTagName('*'));
                domDispatch.call(elem, event, [], false);
                if (event === 'removed') {
                    domData.delete.call(elem);
                }
                for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                    cid = CID(child);
                    if (!dispatched[cid]) {
                        domDispatch.call(child, event, [], false);
                        if (event === 'removed') {
                            domData.delete.call(child);
                        }
                        dispatched[cid] = true;
                    }
                }
            }
        }
    };
    var fireMutations = function () {
        var mutations = mutatedElements;
        mutatedElements = null;
        var firstElement = mutations[0][1][0];
        var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
        var root = doc.contains ? doc : doc.documentElement;
        var dispatched = {
            inserted: {},
            removed: {}
        };
        mutations.forEach(function (mutation) {
            fireOn(mutation[1], root, checks[mutation[0]], mutation[0], dispatched[mutation[0]]);
        });
    };
    var mutated = function (elements, type) {
        if (!getMutationObserver() && elements.length) {
            var firstElement = elements[0];
            var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
            var root = doc.contains ? doc : doc.documentElement;
            if (checks.inserted(root, firstElement)) {
                if (!mutatedElements) {
                    mutatedElements = [];
                    setImmediate(fireMutations);
                }
                mutatedElements.push([
                    type,
                    elements
                ]);
            }
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
                mutated([child], 'removed');
                this.removeChild(child);
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
                mutated([oldChild], 'removed');
                this.replaceChild(newChild, oldChild);
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