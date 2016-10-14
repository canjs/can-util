var isArray = require('../is-array/is-array');
var isContainer = require('../is-container/is-container');

// Returns the `prop` property from `obj`.
// If `add` is true and `prop` doesn't exist in `obj`, create it as an
// empty object.
var getNext = function (obj, prop, add) {
        var result = obj[prop];
        if (result === undefined && add === true) {
            result = obj[prop] = {};
        }
        return result;
    };
/**
 * @function can-util/js/getObject/getObject getObject
 * @signature `getObject(name, roots)`
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
 * var getObject = require("can-util/js/getObject/getObject");
 * console.log(getObject("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
 * console.log(getObject("a.b.c", {a: {}})); // -> undefined
 * console.log(getObject("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
 * ```
 */
function getObject(name, roots) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    var parts = name ? name.replace(/\[/g,'.').replace(/]/g,'').split('.') : [],
        length = parts.length,
        current, r = 0,
        i, container, rootsLength;
    // Make sure roots is an `array`.
    roots = isArray(roots) ? roots : [roots || window];
    rootsLength = roots.length;
    if (!length) {
        return roots[0];
    }
    // For each root, mark it as current.
    for (r; r < rootsLength; r++) {
        current = roots[r];
        container = undefined;
        // Walk current to the 2nd to last object or until there
        // is not a container.
        for (i = 0; i < length && isContainer(current); i++) {
            container = current;
            current = getNext(container, parts[i]);
        }
        // If we found property break cycle
        if (container !== undefined && current !== undefined) {
            break;
        }
    }
    return current;
}

module.exports = getObject;