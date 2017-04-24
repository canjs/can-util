/*can-util@3.3.7#dom/ajax/ajax*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        var Global = require('../../js/global/global');
        var assign = require('../../js/assign/assign');
        var namespace = require('can-namespace');
        var parseURI = require('../../js/parse-uri/parse-uri');
        var param = require('can-param');
        var xhrs = [
                function () {
                    return new XMLHttpRequest();
                },
                function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                },
                function () {
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                },
                function () {
                    return new ActiveXObject('MSXML2.XMLHTTP');
                }
            ], _xhrf = null;
        var originUrl = parseURI(Global().location.href);
        var makeXhr = function () {
            if (_xhrf != null) {
                return _xhrf();
            }
            for (var i = 0, l = xhrs.length; i < l; i++) {
                try {
                    var f = xhrs[i], req = f();
                    if (req != null) {
                        _xhrf = f;
                        return req;
                    }
                } catch (e) {
                    continue;
                }
            }
            return function () {
            };
        };
        var _xhrResp = function (xhr, options) {
            switch (options.dataType || xhr.getResponseHeader('Content-Type').split(';')[0]) {
            case 'text/xml':
            case 'xml':
                return xhr.responseXML;
            case 'text/json':
            case 'application/json':
            case 'text/javascript':
            case 'application/javascript':
            case 'application/x-javascript':
            case 'json':
                return JSON.parse(xhr.responseText);
            default:
                return xhr.responseText;
            }
        };
        module.exports = namespace.ajax = function (o) {
            var xhr = makeXhr(), timer, n = 0;
            var deferred = {};
            var promise = new Promise(function (resolve, reject) {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });
            var requestUrl;
            promise.abort = function () {
                xhr.abort();
            };
            o = assign({
                userAgent: 'XMLHttpRequest',
                lang: 'en',
                type: 'GET',
                data: null,
                dataType: 'json'
            }, o);
            if (o.crossDomain == null) {
                try {
                    requestUrl = parseURI(o.url);
                    o.crossDomain = !!(requestUrl.protocol && requestUrl.protocol !== originUrl.protocol || requestUrl.host && requestUrl.host !== originUrl.host);
                } catch (e) {
                    o.crossDomain = true;
                }
            }
            if (o.timeout) {
                timer = setTimeout(function () {
                    xhr.abort();
                    if (o.timeoutFn) {
                        o.timeoutFn(o.url);
                    }
                }, o.timeout);
            }
            xhr.onreadystatechange = function () {
                try {
                    if (xhr.readyState === 4) {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        if (xhr.status < 300) {
                            if (o.success) {
                                o.success(_xhrResp(xhr, o));
                            }
                        } else if (o.error) {
                            o.error(xhr, xhr.status, xhr.statusText);
                        }
                        if (o.complete) {
                            o.complete(xhr, xhr.statusText);
                        }
                        if (xhr.status >= 200 && xhr.status < 300) {
                            deferred.resolve(_xhrResp(xhr, o));
                        } else {
                            deferred.reject(xhr);
                        }
                    } else if (o.progress) {
                        o.progress(++n);
                    }
                } catch (e) {
                    deferred.reject(e);
                }
            };
            var url = o.url, data = null, type = o.type.toUpperCase();
            var isPost = type === 'POST' || type === 'PUT';
            if (!isPost && o.data) {
                url += '?' + param(o.data);
            }
            xhr.open(type, url);
            var isSimpleCors = o.crossDomain && [
                'GET',
                'POST',
                'HEAD'
            ].indexOf(type) !== -1;
            if (isPost) {
                var isJson = o.dataType.indexOf('json') >= 0;
                data = isJson && !isSimpleCors ? typeof o.data === 'object' ? JSON.stringify(o.data) : o.data : param(o.data);
                xhr.setRequestHeader('Content-Type', isJson && !isSimpleCors ? 'application/json' : 'application/x-www-form-urlencoded');
            }
            if (!isSimpleCors) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
            xhr.send(data);
            return promise;
        };
    }(function () {
        return this;
    }()));
});