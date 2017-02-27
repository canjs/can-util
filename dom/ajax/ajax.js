var Global = require("../../js/global/global");
var assign = require("../../js/assign/assign");
var namespace = require("can-namespace");
var parseURI = require('../../js/parse-uri/parse-uri');
var param = require("../../js/param/param");

/**
 * @module {function} can-util/dom/ajax/ajax ajax
 * @parent can-util/dom
 * 
 * Make an asynchronous HTTP (AJAX) request.
 * 
 * @signature `ajax( ajaxOptions )`
 * 
 *    Is used to make an asynchronous HTTP (AJAX) request similar to [http://api.jquery.com/jQuery.ajax/jQuery.ajax].
 *   
 *    ```
 *    var ajax = require("can-util/dom/ajax/ajax");
 *    
 *    ajax({
 *      url: "http://query.yahooapis.com/v1/public/yql",
 *      data: {
 *        format: "json",
 *        q: 'select * from geo.places where text="sunnyvale, ca"'
 *      }
 *    }).then(function(response){
 *      console.log( response.query.count ); // => 2
 *    });
 *    ```
 * 
 *    @param {can-util/typedefs/ajaxOptions} ajaxOptions Configuration options for the AJAX request.
 *      - __url__ {String} The requested url.
 *      - __type__ {String} The method of the request. Ex: `GET`, `PUT`, `POST`, etc. Capitalization is ignored. Default is `GET`.
 *      - __data__ {Object} The data of the request. If data needs to be urlencoded (e.g. for GET requests or for CORS) it is serialized with [can-util/js/param].
 *      - __dataType__ {String} Type of data. Default is `json`.
 *      - __crossDomain__ {Boolean} If you wish to force a crossDomain request (such as JSONP) on the same domain, set the value of crossDomain to true. This allows, for example, server-side redirection to another domain. Default: `false` for same-domain requests, `true` for cross-domain requests.
 *      - __timeout__ {Number} Set a timeout (in milliseconds) for the request. A value of 0 means there will be no timeout.
 *      - __timeoutFn__ {Function} Timeout callback to be called after `xhr.abort()`.
 *      - __success__ {Function} A function to be called if the request succeeds. The function gets passed one argument based on content type: `xhr.responseText`, `xhr.responseXML` or parsed JSON.
 *      - __error__ {Function} A function to be called if the request fails. The function receives three arguments: `xhr`, `xhr.status` and `xhr.statusText`. 
 *      - __complete__ {Function} A function to be called when the request finishes (after success and error callbacks are executed). The function gets passed two arguments: `xhr`, `xhr.statusText`.
 *      - __userAgent__ {String} Default: `XMLHttpRequest`.
 *      - __lang__ {String} Default `en`.
 *
 *    @return {Promise} A Promise that resolves to the data. The Promise instance is abortable and exposes an `abort` method. Invoking abort on the Promise instance indirectly rejects it.
 * 
 */

// from https://gist.github.com/mythz/1334560
var xhrs = [
		function () { return new XMLHttpRequest(); },
		function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
		function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
		function () { return new ActiveXObject("MSXML2.XMLHTTP"); }
	],
	_xhrf = null;
// used to check for Cross Domain requests
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
	return function () { };
};

var _xhrResp = function (xhr, options) {
	switch (options.dataType || xhr.getResponseHeader("Content-Type").split(";")[0]) {
		case "text/xml":
		case "xml":
			return xhr.responseXML;
		case "text/json":
		case "application/json":
		case "text/javascript":
		case "application/javascript":
		case "application/x-javascript":
		case "json":
			return JSON.parse(xhr.responseText);
		default:
			return xhr.responseText;
	}
};

module.exports = namespace.ajax = function (o) {
	var xhr = makeXhr(), timer, n = 0;
	var deferred = {};
	var promise = new Promise(function(resolve,reject){
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	var requestUrl;

	promise.abort = function () {
		xhr.abort();
	};

	o = assign({
		userAgent: "XMLHttpRequest",
		lang: "en",
		type: "GET",
		data: null,
		dataType: "json"
	}, o);

	//how jquery handles check for cross domain
	if(o.crossDomain == null){
		try {
			requestUrl = parseURI(o.url);
			o.crossDomain = !!((requestUrl.protocol && requestUrl.protocol !== originUrl.protocol) ||
				(requestUrl.host && requestUrl.host !== originUrl.host));

		} catch (e){
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
						o.success( _xhrResp(xhr, o) );
					}
				}
				else if (o.error) {
					o.error(xhr, xhr.status, xhr.statusText);
				}
				if (o.complete) {
					o.complete(xhr, xhr.statusText);
				}

				if (xhr.status >= 200 && xhr.status < 300) {
					deferred.resolve( _xhrResp(xhr, o) );
				} else {
					deferred.reject( xhr );
				}
			}
			else if (o.progress) {
				o.progress(++n);
			}
		} catch(e) {
			deferred.reject(e);
		}
	};
	var url = o.url, data = null, type = o.type.toUpperCase();
	var isPost = type === "POST" || type === "PUT";
	if (!isPost && o.data) {
		url += "?" + param(o.data);
	}
	xhr.open(type, url);

	// For CORS to send a "simple" request (to avoid a preflight check), the following methods are allowed: GET/POST/HEAD,
	// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
	var isSimpleCors = o.crossDomain && ['GET', 'POST', 'HEAD'].indexOf(type) !== -1;
	
	if (isPost) {
		var isJson = o.dataType.indexOf("json") >= 0;
		data = (isJson && !isSimpleCors) ?
			(typeof o.data === "object" ? JSON.stringify(o.data) : o.data):
			param(o.data);

		// CORS simple: `Content-Type` has to be `application/x-www-form-urlencoded`:
		xhr.setRequestHeader("Content-Type", (isJson && !isSimpleCors) ? "application/json" : "application/x-www-form-urlencoded");
	}
	
	// CORS simple: no custom headers, so we don't add `X-Requested-With` header:
	if (!isSimpleCors){
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	}

	xhr.send(data);
	return promise;
};
