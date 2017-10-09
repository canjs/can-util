/*can-util@3.10.11#js/import/import*/
define([
    'require',
    'exports',
    'module',
    '../is-function/is-function',
    'can-globals/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var isFunction = require('../is-function/is-function');
        var global = require('can-globals/global')();
        module.exports = function (moduleName, parentName) {
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
                        resolve();
                    }
                } catch (err) {
                    reject(err);
                }
            });
        };
    }(function () {
        return this;
    }()));
});