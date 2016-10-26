/*can-util@3.0.2#dom/ajax/ajax*/
define(function (require, exports, module) {
    (function (global) {
        var Global = require('../../js/global/global');
        var assign = require('../../js/assign/assign');
        var namespace = require('../../namespace');
        var parseURI = require('../../js/parse-uri/parse-uri');
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
        var $ = {};
        $.xhr = function () {
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
        $._xhrResp = function (xhr, options) {
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
        $._formData = function (o) {
            var kvps = [], regEx = /%20/g;
            for (var k in o) {
                kvps.push(encodeURIComponent(k).replace(regEx, '+') + '=' + encodeURIComponent(o[k].toString()).replace(regEx, '+'));
            }
            return kvps.join('&');
        };
        module.exports = namespace.ajax = function (o) {
            var xhr = $.xhr(), timer, n = 0;
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
                    o.crossDomain = originUrl.protocol + '//' + originUrl.host !== requestUrl.protocol + '//' + requestUrl.host;
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
                                o.success($._xhrResp(xhr, o));
                            }
                        } else if (o.error) {
                            o.error(xhr, xhr.status, xhr.statusText);
                        }
                        if (o.complete) {
                            o.complete(xhr, xhr.statusText);
                        }
                        if (xhr.status >= 200 && xhr.status < 300) {
                            deferred.resolve($._xhrResp(xhr, o));
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
                url += '?' + $._formData(o.data);
            }
            xhr.open(type, url);
            if (isPost) {
                var isJson = o.dataType.indexOf('json') >= 0;
                data = isJson && !o.crossDomain ? typeof o.data === 'object' ? JSON.stringify(o.data) : o.data : $._formData(o.data);
                xhr.setRequestHeader('Content-Type', isJson && !o.crossDomain ? 'application/json' : 'application/x-www-form-urlencoded');
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(data);
            return promise;
        };
    }(function () {
        return this;
    }()));
});