var isWebWorker = require('can-util/js/is-web-worker/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-web-worker");

QUnit.test("basics", function(){
	equal(typeof isWebWorker() , "boolean");
});
