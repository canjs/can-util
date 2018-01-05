'use strict';

var diff = require('../diff/diff');

/**
 * @module {function} can-util/js/diff-array/diff-array diff-array
 * @parent can-util/js
 * @signature `diffArray(oldList, newList, [identity])`
 *
 * @param  {ArrayLike} oldList the array to diff from
 * @param  {ArrayLike} newList the array to diff to
 * @param  {function} identity an optional identity function for comparing elements
 * @return {Array}     a list of Patch objects representing the differences
 *
 * Returns the difference between two ArrayLike objects (that have nonnegative
 * integer keys and the `length` property) as an array of patch objects.
 *
 * A patch object returned by this function has the following properties:
 *
 * - **index**:  the index of newList where the patch begins
 * - **deleteCount**: the number of items deleted from that index in newList
 * - **insert**: an Array of items newly inserted at that index in newList
 *
 * ```js
 * var diff = require("can-util/js/diff-array/diff-array");
 *
 * console.log(diff([1], [1, 2])); // -> [{index: 1, deleteCount: 0, insert: [2]}]
 * console.log(diff([1, 2], [1])); // -> [{index: 1, deleteCount: 1, insert: []}]
 *
 * // with an optional identity function:
 * diff(
 *     [{id:1},{id:2}],
 *     [{id:1},{id:3}],
 *     (a,b) => a.id === b.id
 * ); // -> [{index: 1, deleteCount: 1, insert: [{id:3}]}]
 * ```
 */
module.exports = exports = diff;
