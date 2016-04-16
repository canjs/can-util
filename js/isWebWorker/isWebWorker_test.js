var isWebWorker = require('can-util/js/isWebWorker/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isWebWorker")

QUnit.test("basics", function(){
	equal(typeof isWebWorker() , "boolean");
});
