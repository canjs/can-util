var isContainer = require('../is-container/is-container');

/**
 * @function can-util/js/get/get get
 * @signature `get(name, roots)`
 * @param  {String} name  a String of dot-separated keys, representing a path of properties
 * @param  {Object|Array} roots the object to use as the root for property based navigation
 * @return {*}       the value at the property path descending from `roots`
 *
 * Return the result of descending the path `name` through the properties of the object or objects
 * `roots`
 * 
 * If `roots` is an Array, each element of the array is evaluated, in order, until
 * the path is found in an element's properties (and properties-of-properties, etc.).  Otherwise
 * `roots` is evaluated as the root object, returning either the object at the property path
 * descended from `roots` or `undefined` if any subpath is not found.
 *
 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the first object in `roots`
 * if it's an array, `roots` itself otherwise.
 * 
 * ```js
 * var get = require("can-util/js/get/get");
 * console.log(get("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
 * console.log(get("a.b.c", {a: {}})); // -> undefined
 * console.log(get("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
 * ```
 */
function get(name, obj) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    var parts = name ? name.replace(/\[/g,'.')
    		.replace(/]/g,'').split('.') : [],
        length = parts.length,
        current, i, container;

    
    if (!length) {
        return obj;
    }

    current = obj;

    // Walk current to the 2nd to last object or until there
    // is not a container.
    for (i = 0; i < length && isContainer(current); i++) {
        container = current;
        current = container[parts[i]];
    }

    return current;
}

module.exports = get;
