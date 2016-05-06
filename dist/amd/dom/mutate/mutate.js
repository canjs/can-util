/*can-util@3.0.0-pre.14#dom/mutate/mutate*/
define(function (require, exports, module) {
    var makeArray = require('../../js/make-array/make-array');
    var setImmediate = require('../../js/set-immediate/set-immediate');
    var getMutationObserver = require('../mutation-observer/mutation-observer');
    var childNodes = require('../child-nodes/child-nodes');
    var domContains = require('../contains/contains');
    var domDispatch = require('../dispatch/dispatch');
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