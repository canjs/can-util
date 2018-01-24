'use strict';

var isContainer = require('../is-container/is-container');

/**
 * @module {function} can-util/js/get/get get
 * @parent can-util/js
 *
 * @signature `get(obj, path)`
 * @param  {Object} obj the object to use as the root for property based navigation
 * @param  {String} path a String of dot-separated keys, representing a path of properties
 * @return {*}       the value at the property path
 *
 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the object passed.
 *
 * ```js
 * var get = require("can-util/js/get/get");
 * console.log(get({a: {b: {c: "foo"}}}, "a.b.c")); // -> "foo"
 * console.log(get({a: {}}, "a.b.c")); // -> undefined
 * console.log(get([{a: {}}, {a: {b: "bar"}}], "a.b")); // -> "bar"
 * ```
 */
function get(obj, name) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    var parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g,'.')
    		.replace(/]/g,'').split('.') : [],
        length = parts.length,
        current, i, container;

    if (!length) {
        return obj;
    }

    current = obj;

    // Walk current to the 2nd to last object or until there
    // is not a container.
    for (i = 0; i < length && isContainer(current) && current !== null; i++) {
        container = current;
        current = container[parts[i]];
    }

    return current;
}

module.exports = get;
