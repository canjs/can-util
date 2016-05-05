/*can-util@3.0.0-pre.12#js/js*/
define(function (require, exports, module) {
    module.exports = {
        assign: require('./assign/assign'),
        cid: require('./cid/cid'),
        deepExtend: require('./deep-extend/deep-extend'),
        dev: require('./dev/dev'),
        diff: require('./diff/diff'),
        each: require('./each/each'),
        global: require('./global/global'),
        import: require('./import/import'),
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
        makeArra: require('./make-array/make-array'),
        setImmediate: require('./set-immediate/set-immediate'),
        string: require('./string/string'),
        types: require('./types/types')
    };
});