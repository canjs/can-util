'use strict';

var ajax = require('./ajax');
var namespace = require("can-namespace");
var makeMap = require('../../js/make-map/make-map');
var GLOBAL = require("../../js/global/global");
var parseURI = require('../../js/parse-uri/parse-uri');

var QUnit = require('../../test/qunit');
var helpers = require('../../test/helpers');
var isMainCanTest = typeof System === 'object' && System.env !== 'canjs-test';
var hasLocalServer = !helpers.isServer() && !helpers.isProduction();

QUnit.module("can-util/dom/ajax");

var makeFixture = function(XHR){

	var oldXhr = window.XMLHttpRequest || window.ActiveXObject;
	if (window.XMLHttpRequest) {
		window.XMLHttpRequest = XHR;
	} else if (window.ActiveXObject) {
		window.ActiveXObject = XHR;
	}

	return function restoreXHR(){
		if (window.XMLHttpRequest) {
			window.XMLHttpRequest = oldXhr;
		} else if (window.ActiveXObject) {
			window.ActiveXObject = oldXhr;
		}
	};
};

// A helper to make a predicate for a given comma-separated list that checks whether it contains a given value:
var makePredicateContains = function (str){
	var obj = makeMap(str);
	return function(val){
		return obj[val];
	};
};

if (hasLocalServer) {
	QUnit.asyncTest("basic get request", function () {
		console.log('AJAX');
		ajax({
			type: "get",
			url: __dirname+"/test-result.json"
		}).then(function(resp){
			console.log('VALUE');
			QUnit.equal(resp.message, "VALUE");
			start();
		});
	});
}

QUnit.test("added to namespace (#99)", function(){
	QUnit.equal(namespace.ajax, ajax);
});

if (hasLocalServer) {
	QUnit.asyncTest("GET requests with dataType parse JSON (#106)", function(){
		ajax({
			type: "get",
			url: __dirname+"/test-result.txt",
			dataType: "json"
		}).then(function(resp){
			QUnit.equal(resp.message, "VALUE");
			start();
		});
	});
}

QUnit.asyncTest("ignores case of type parameter for a post request (#100)", function () {
	var requestHeaders = {
			CONTENT_TYPE: "Content-Type"
		},
		restore = makeFixture(function () {
			this.open = function (type, url) {
			};

			this.send = function () {
				this.readyState = 4;
				this.status = 200;
				this.onreadystatechange();
			};

			this.setRequestHeader = function (header, value) {
				if (header === requestHeaders.CONTENT_TYPE) {
					var o = {};
					o[header] = value;
					this.responseText = JSON.stringify(o);
				}
			};
		});



	ajax({
		type: "post",
		url: "http://anotherdomain.com/foo",
		data: {
			bar: "qux"
		}
	}).then(function (value) {
		QUnit.equal(value[requestHeaders.CONTENT_TYPE], "application/x-www-form-urlencoded");
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	}).then(function () {
		// restore original values
		restore();
		start();
	});
});

QUnit.asyncTest("url encodes GET requests when no contentType", function(){
	var restore = makeFixture(function () {
		var o = {};
		this.open = function (type, url) {
			o.url = url;
		};

		this.send = function (data) {
			o.data = data;
			this.readyState = 4;
			this.status = 200;
			this.responseText = JSON.stringify(o);
			this.onreadystatechange();
		};

		this.setRequestHeader = function (header, value) {
			if (header === "Content-Type") {
				o[header] = value;
			}
		};
	});

	ajax({
		type: "get",
		url: "http://anotherdomain.com/foo",
		data: { foo: "bar" }
	}).then(function(value){
		QUnit.equal(value["Content-Type"], "application/x-www-form-urlencoded");
		QUnit.equal(value.data, undefined, "No data provided because it's a GET");
		QUnit.equal(value.url, "http://anotherdomain.com/foo?foo=bar");
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	})
	.then(function(){
		restore();
		start();
	});
});

QUnit.asyncTest("Stringifies GET requests when contentType=application/json", function(){
	var restore = makeFixture(function () {
		var o = {};
		this.open = function (type, url) {
			o.url = url;
		};

		this.send = function (data) {
			o.data = data;
			this.readyState = 4;
			this.status = 200;
			this.responseText = JSON.stringify(o);
			this.onreadystatechange();
		};

		this.setRequestHeader = function (header, value) {
			if (header === "Content-Type") {
				o[header] = value;
			}
		};
	});

	ajax({
		type: "get",
		url: "http://anotherdomain.com/foo",
		data: { foo: "bar" },
		contentType: "application/json"
	}).then(function(value){
		QUnit.equal(value["Content-Type"], "application/json");
		QUnit.equal(value.data, undefined, "No data provided because it's a GET");
		QUnit.equal(value.url, 'http://anotherdomain.com/foo?{"foo":"bar"}');
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	})
	.then(function(){
		restore();
		start();
	});

});

QUnit.asyncTest("Stringifies POST requests when there is no contentType", function(){
	var restore = makeFixture(function () {
		var o = {};
		this.open = function (type, url) {
			o.url = url;
		};

		this.send = function (data) {
			o.data = data;
			this.readyState = 4;
			this.status = 200;
			this.responseText = JSON.stringify(o);
			this.onreadystatechange();
		};

		this.setRequestHeader = function (header, value) {
			if (header === "Content-Type") {
				o[header] = value;
			}
		};
	});

	var origin = parseURI(GLOBAL().location.href);
	var url = origin.protocol + origin.authority + "/foo";

	ajax({
		type: "post",
		url: url,
		data: { foo: "bar" }
	}).then(function(value){
		QUnit.equal(value["Content-Type"], "application/json");
		QUnit.equal(value.data, '{"foo":"bar"}', "Data was stringified");
		QUnit.equal(value.url, url);
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	})
	.then(function(){
		restore();
		start();
	});

});

QUnit.asyncTest("url encodes POST requests when contentType=application/x-www-form-urlencoded", function(){
	// test that contentType is application/blah
	var restore = makeFixture(function () {
		var o = {};
		this.open = function (type, url) {
			o.url = url;
		};

		this.send = function (data) {
			o.data = data;
			this.readyState = 4;
			this.status = 200;
			this.responseText = JSON.stringify(o);
			this.onreadystatechange();
		};

		this.setRequestHeader = function (header, value) {
			if (header === "Content-Type") {
				o[header] = value;
			}
		};
	});

	ajax({
		type: "post",
		url: "http://anotherdomain.com/foo",
		data: { foo: "bar" },
		contentType: "application/x-www-form-urlencoded"
	}).then(function(value){
		QUnit.equal(value["Content-Type"], "application/x-www-form-urlencoded");
		QUnit.equal(value.data, 'foo=bar', "Data was url encoded");
		QUnit.equal(value.url, 'http://anotherdomain.com/foo');
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	})
	.then(function(){
		restore();
		start();
	});

});

if(typeof XDomainRequest === 'undefined') {
	if (!helpers.isServer()) {
		// There are timing issues with mocha-qunit-ui
		QUnit.asyncTest("cross domain post request should change data to form data (#90)", function () {
			ajax({
				type: "POST",
				url: "http://httpbin.org/post",
				data: {'message': 'VALUE'},
				dataType: 'application/json'
			}).then(function(resp){
				QUnit.equal(resp.form.message, "VALUE");
				start();
			});
		});
	}

	// Test simple GET CORS:
	QUnit.asyncTest("GET CORS should be a simple request - without a preflight (#187)", function () {

		// CORS simple requests: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
		var isSimpleRequest = true, restore;
		var isSimpleMethod = makePredicateContains("GET,POST,HEAD");
		var isSimpleHeader = makePredicateContains("Accept,Accept-Language,Content-Language,Content-Type,DPR,Downlink,Save-Data,Viewport-Width,Width");
		var isSimpleContentType = makePredicateContains("application/x-www-form-urlencoded,multipart/form-data,text/plain");

		restore = makeFixture(function () {
			this.open = function (type, url) {
				if (!isSimpleMethod(type)){
					isSimpleRequest = false;
				}
			};

			var response = {};
			this.send = function () {
				this.responseText = JSON.stringify(response);
				this.readyState = 4;
				this.status = 200;
				this.onreadystatechange();
			};

			this.setRequestHeader = function (header, value) {
				if (header === "Content-Type" && !isSimpleContentType(value)){
					isSimpleRequest = false;
				}
				if (isSimpleRequest && !isSimpleHeader(header)){
					isSimpleRequest = false;
				}
				response[header] = value;
			};
		});

		ajax({
			url: "http://query.yahooapis.com/v1/public/yql",
			data: {
				q: 'select * from geo.places where text="sunnyvale, ca"',
				format: "json"
			}
		}).then(function(response){
			QUnit.ok(isSimpleRequest, "CORS GET is simple");
			restore();
			start();
		}, function(err){
			QUnit.ok(false, "Should be resolved");
			restore();
			start();
		});
	});
}

if(isMainCanTest && hasLocalServer) {
	// Brittle in IE 9
	QUnit.asyncTest("abort", function () {
		var promise = ajax({
			type: "get",
			url: __dirname+"/test-result.json"
		});
		promise.catch(function(xhr) {
			if(xhr instanceof Error) {
				// IE9 - see http://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
				QUnit.equal(xhr.message, 'Could not complete the operation due to error c00c023f.');
				start();
			} else {
				setTimeout(function() {
					QUnit.equal(xhr.readyState, 0, "aborts the promise");
					start();
				}, 50);
			}
		});
		promise.abort();
	});
}


QUnit.asyncTest("crossDomain is true for relative requests", function(){
	var headers = {},
		restore = makeFixture(function () {
			this.open = function (type, url) {
			};

			this.send = function () {
				this.readyState = 4;
				this.status = 200;
				this.responseText = JSON.stringify({great: "success"});
				this.onreadystatechange();
			};

			this.setRequestHeader = function (header, value) {
				headers[header] = value;
			};
		});

	ajax({
		type: "post",
		url: "/foo",
		data: {
			bar: "qux"
		},
		dataType: "json"
	}).then(function (value) {
		QUnit.deepEqual(headers, {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"});
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	}).then(function () {
		// restore original values
		restore();
		start();
	});
});

if (hasLocalServer) {
	QUnit.asyncTest("correctly serializes null and undefined values (#177)", function () {
		ajax({
			type: "get",
			url: __dirname + "/test-result.txt",
			data: {
				foo: null
			}
		}).then(function (resp) {
			QUnit.equal(resp.message, "VALUE");
			start();
		});
	});
}
