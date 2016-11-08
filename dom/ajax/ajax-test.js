var ajax = require('can-util/dom/ajax/ajax');
var namespace = require("can-util/namespace");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/ajax");

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
	var oldXhr = window.XMLHttpRequest || window.ActiveXObject,
		requestHeaders = {
			CONTENT_TYPE: "Content-Type"
		},
		xhrFixture = function () {
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
		};

	// replace with fixture
	if (window.XMLHttpRequest) {
		window.XMLHttpRequest = xhrFixture;
	} else if (window.ActiveXObject) {
		window.ActiveXObject = xhrFixture;
	}

	ajax({
		type: "post",
		url: "/foo",
		data: {
			bar: "qux"
		}
	}).then(function (value) {
		QUnit.equal(value[requestHeaders.CONTENT_TYPE], "application/x-www-form-urlencoded");
	}, function (reason) {
		QUnit.notOk(reason, "request failed with reason = ", reason);
	}).then(function () {
		// restore original values
		if (window.XMLHttpRequest) {
			window.XMLHttpRequest = oldXhr;
		} else if (window.ActiveXObject) {
			window.ActiveXObject = oldXhr;
		}
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
