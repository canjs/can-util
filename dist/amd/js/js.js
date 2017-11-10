/*can-util@3.10.14#js/js*/
define([
    'require',
    'exports',
    'module',
    'can-assign',
    'can-cid',
    './deep-assign/deep-assign',
    './dev/dev',
    './diff/diff',
    './each/each',
    './global/global',
    './import/import',
    './is-array/is-array',
    './is-array-like/is-array-like',
    './is-browser-window/is-browser-window',
    './is-empty-object/is-empty-object',
    './is-function/is-function',
    './is-node/is-node',
    './is-plain-object/is-plain-object',
    './is-promise/is-promise',
    './is-string/is-string',
    './is-web-worker/is-web-worker',
    './join-uris/join-uris',
    './last/last',
    './make-array/make-array',
    './omit/omit',
    './set-immediate/set-immediate',
    './string/string',
    'can-types'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = {
            assign: require('can-assign'),
            cid: require('can-cid'),
            deepAssign: require('./deep-assign/deep-assign'),
            dev: require('./dev/dev'),
            diff: require('./diff/diff'),
            each: require('./each/each'),
            global: require('./global/global'),
            'import': require('./import/import'),
            isArray: require('./is-array/is-array'),
            isArrayLike: require('./is-array-like/is-array-like'),
            isBrowserWindow: require('./is-browser-window/is-browser-window'),
            isEmptyObject: require('./is-empty-object/is-empty-object'),
            isFunction: require('./is-function/is-function'),
            isNode: require('./is-node/is-node'),
            isPlainObject: require('./is-plain-object/is-plain-object'),
            isPromise: require('./is-promise/is-promise'),
            isString: require('./is-string/is-string'),
            isWebWorker: require('./is-web-worker/is-web-worker'),
            joinURIs: require('./join-uris/join-uris'),
            last: require('./last/last'),
            makeArray: require('./make-array/make-array'),
            omit: require('./omit/omit'),
            setImmediate: require('./set-immediate/set-immediate'),
            string: require('./string/string'),
            types: require('can-types')
        };
    }(function () {
        return this;
    }(), require, exports, module));
});