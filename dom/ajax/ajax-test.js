var ajax = require('can-util/dom/ajax/ajax');

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
	promise.catch(function(reason) {
		QUnit.equal(reason.readyState, 0, 'aborts the promise');
		start();
	});
	promise.abort();
});
