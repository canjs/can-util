'use strict';

var ajax = require('can-util/dom/ajax/ajax');
var namespace = require("can-namespace");
var makeMap = require('can-util/js/make-map/make-map');

QUnit = require('steal-qunit');

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



if (__dirname !== '/') {
	QUnit.asyncTest("basic get request", function () {
		ajax({
			type: "get",
			url: __dirname+"/test-result.json"
		}).then(function(resp){
			QUnit.equal(resp.message, "VALUE");
			start();
		});
	});
}

QUnit.test("added to namespace (#99)", function(){
	QUnit.equal(namespace.ajax, ajax);
});

if (__dirname !== '/') {
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

if(typeof XDomainRequest === 'undefined') {
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
				if (header === "Content-Type" && !isSimpleHeader(value)){
					isSimpleRequest = false;
				}
				if (isSimpleContentType(header)){
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

if(System.env !== 'canjs-test' && __dirname !== '/') {
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

if (__dirname !== '/') {
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
