@module {Object} can-util
@parent can-js-utilities
@collection can-infrastructure
@package ../package.json
@group can-util/js 0 can-util/js
@group can-util/dom 1 can-util/dom
@group deprecated 2 deprecated

Common JavaScript utilities for the rest of CanJS.

@body

## can-util/js

- [can-util/js/base-url/base-url] - Get and/or set the "base" (containing path) of the document.
- [can-util/js/deep-assign/deep-assign] - Assign properties from a source object to a target object, deeply copying properties that are objects or arrays.
- [can-util/js/defaults/defaults] - Mimics [_.defaults](https://lodash.com/docs/4.16.2#defaults). Assigns first level properties in sources from left to right if they are not already defined.
- [can-util/js/diff/diff] - Returns the difference between two ArrayLike objects (that have nonnegative integer keys and the `length` property) as an array of patch objects.
- [can-util/js/diff-object/diff-object] - Find the differences between two objects, based on properties and values.
- [can-util/js/each/each] - Loop over each element in an Array-Like data structure.
- [can-util/js/get/get] - Returns the value at the specified property path of an object.   
- [can-util/js/import/import] - Imports a module.
- [can-util/js/is-array-like/is-array-like] - Determines if an object is "array like", meaning it can be looped over. Any object with a `.length` property is array like.
- [can-util/js/is-empty-object/is-empty-object] - Used to determine if an object is an empty object (an object with no enumerable properties) such as `{}`.
- [can-util/js/is-function/is-function] - Used to determine if a value is a function.
- [can-util/js/is-node/is-node] - Determines if your code is running in [Node.js](https://nodejs.org).
- [can-util/js/is-plain-object/is-plain-object] - Attempts to determine if an object is a plain object like those you would create using the curly braces syntax: `{}`.
- [can-util/js/is-promise/is-promise] - Determines if object is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- [can-util/js/is-promise-like/is-promise-like] - Determines if an object is "Then-able".
- [can-util/js/is-web-worker/is-web-worker] - Determines if the code is running with a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
- [can-util/js/join-uris/join-uris] - Provides a convenient way to join together URIs handling relative paths.
- [can-util/js/make-array/make-array] - Takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array.
- [can-util/js/make-promise/make-promise] - Will make isPromiseLike object into [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- [can-util/js/omit/omit] - Omit properties from an object.
- [can-util/js/set-immediate/set-immediate] - Polyfill for setImmediate() if it doesn't exist in the global context.
- [can-util/js/string/string] - String utilities used by CanJS libraries.
- [can-util/js/string-to-any/string-to-any] - Turns a string representation of a primitive type back into the associated primitive.

## can-util/dom

- [can-util/dom/attr/attr] - A module that makes it easy to access attributes and properties of elements.
- [can-util/dom/child-nodes/child-nodes] - Get all of the childNodes of a given node.
- [can-util/dom/class-name/class-name] - Allows querying and manipulation of classes on HTML elements.
- [can-util/dom/data/data] - Allows associating data as a key/value pair for a particular DOM node.
- [can-util/dom/dispatch/dispatch] - Dispatch an event on an element.
- [can-util/dom/events/events] - Allows you to listen to a domEvent and special domEvents as well as dispatch domEvents.
- [can-util/dom/frag/frag] - Convert a String, HTMLElement, documentFragment, or contentArray into a documentFragment.
- [can-util/dom/mutate/mutate] - Mutate an element by appending, inserting, and removing DOM nodes. Use this so that on the server "inserted" will be fired.

## deprecated

- [can-util/dom/ajax/ajax] - Deprecated. Use [can-ajax] instead.
- [can-util/js/assign/assign] - Deprecated. Use [can-assign] instead.
- [can-util/js/cid/cid] - Deprecated. Use [can-cid] instead.
- [can-util/js/deparam/deparam] - Deprecated. Use [can-deparam] instead.
- [can-util/js/dev/dev] - Deprecated. Use [can-log/dev/dev] instead.
- [can-util/dom/document/document] - Deprecated. Use [can-globals/document/document] instead.
- [can-util/js/global/global] - Deprecated. Use [can-globals/global/global] instead.
- [can-util/js/is-browser-window/is-browser-window] - Deprecated. Use [can-globals/is-browser-window/is-browser-window] instead.
- [can-util/js/is-string/is-string] - Deprecated. Use `typeof` instead.
- [can-util/js/log/log] - Deprecated. Use [can-log] instead.
- [can-util/js/param/param] - Deprecated. Use [can-param] instead.
- [can-util/js/types/types] - Deprecated. Use [can-types] instead.
