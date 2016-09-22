var ajax = require('can-util/dom/ajax/ajax');
var namespace = require("can-util/namespace");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/ajax");

QUnit.asyncTest("basic get request", function () {
	ajax({
		type: "get",
		url: __dirname+"/test-result.json"
	}).then(function(resp){
		QUnit.equal(resp.message, "VALUE");
		start();
	});
});

QUnit.asyncTest("abort", function () {
	var promise = ajax({
		type: "get",
		url: __dirname+"/test-result.json"
	});
	promise.catch(function(xhr) {
		if(xhr instanceof Error) {
			// IE9 - see http://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
			QUnit.equal(xhr.message, 'Could not complete the operation due to error c00c023f.');
		} else {
			QUnit.equal(xhr.readyState, 0, "aborts the promise");
		}

		start();
	});
	promise.abort();
});

QUnit.test("added to namespace (#99)", function(){
	QUnit.equal(namespace.ajax, ajax);
});
