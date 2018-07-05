/*can-util@3.11.7#js/import/import*/
define([
    'require',
    'exports',
    'module',
    '../is-function/is-function',
    'can-globals/global',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var isFunction = require('../is-function/is-function');
        var global = require('can-globals/global')();
        var namespace = require('can-namespace');
        module.exports = namespace.import = function (moduleName, parentName) {
            return new Promise(function (resolve, reject) {
                try {
                    if (typeof global.System === 'object' && isFunction(global.System['import'])) {
                        global.System['import'](moduleName, { name: parentName }).then(resolve, reject);
                    } else if (global.define && global.define.amd) {
                        global.require([moduleName], function (value) {
                            resolve(value);
                        });
                    } else if (global.require) {
                        resolve(global.require(moduleName));
                    } else {
                        if (typeof stealRequire !== 'undefined') {
                            steal.import(moduleName, { name: parentName }).then(resolve, reject);
                        } else {
                            resolve();
                        }
                    }
                } catch (err) {
                    reject(err);
                }
            });
        };
    }(function () {
        return this;
    }(), require, exports, module));
});