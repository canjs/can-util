var assign = require("../../js/assign/assign");
var namespace = require("../../namespace");

/**
@module {function} can-util/dom/ajax/ajax ajax
@parent can-util/dom
@signature `ajax(settings)`
@param {Object} settings Configuration options for the AJAX request.
The list of configuration options is the same as for [jQuery.ajax](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings).
@return {Promise} A Promise that resolves to the data. The Promise instance is abortable and exposes an `abort` method.
 Invoking abort on the Promise instance indirectly rejects it.

@body
`ajax( settings )` is used to make an asynchronous HTTP (AJAX) request
similar to [http://api.jquery.com/jQuery.ajax/jQuery.ajax]. The example below
makes use of [can-util/dom/frag/frag].

        ajax({
                url: 'http://canjs.com/docs/can.ajax.html',
                success: function(document) {
                        var frag = can.frag(document);
                        return frag.querySelector(".heading h1").innerText; //-> ajax
                }
        });

 */

// from https://gist.github.com/mythz/1334560
var xhrs = [
		function () { return new XMLHttpRequest(); },
		function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
		function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
		function () { return new ActiveXObject("MSXML2.XMLHTTP"); }
	],
	_xhrf = null;

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
	return function () { };
};
$._xhrResp = function (xhr) {
	switch (xhr.getResponseHeader("Content-Type").split(";")[0]) {
		case "text/xml":
			return xhr.responseXML;
		case "text/json":
		case "application/json":
		case "text/javascript":
		case "application/javascript":
		case "application/x-javascript":
			return JSON.parse(xhr.responseText);
		default:
			return xhr.responseText;
	}
};
$._formData = function (o) {
	var kvps = [], regEx = /%20/g;
	for (var k in o) {
		kvps.push(encodeURIComponent(k).replace(regEx, "+") + "=" + encodeURIComponent(o[k].toString()).replace(regEx, "+"));
	}
	return kvps.join('&');
};
module.exports = namespace.ajax = function (o) {
	var xhr = $.xhr(), timer, n = 0;
	var deferred = {};
	var promise = new Promise(function(resolve,reject){
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	promise.abort = function () {
		xhr.abort();
	};

	o = assign({ userAgent: "XMLHttpRequest", lang: "en", type: "GET", data: null, dataType: "application/x-www-form-urlencoded" }, o);
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
						o.success($._xhrResp(xhr));
					}
				}
				else if (o.error) {
					o.error(xhr, xhr.status, xhr.statusText);
				}
				if (o.complete) {
					o.complete(xhr, xhr.statusText);
				}

				if( xhr.status === 200 ) {
					deferred.resolve( JSON.parse( xhr.responseText ) );
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
		url += "?" + $._formData(o.data);
	}
	xhr.open(type, url);

	if (isPost) {
		var isJson = o.dataType.indexOf("json") >= 0;
		data = isJson ?
			(typeof o.data === "object" ? JSON.stringify(o.data) : o.data):
			$._formData(o.data);
		xhr.setRequestHeader("Content-Type", isJson ? "application/json" : "application/x-www-form-urlencoded");
	}
	// X-Requested-With header
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest" );

	xhr.send(data);
	return promise;
};
