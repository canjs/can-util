var isWebWorker = require('./is-web-worker');

QUnit.module("can-util/js/is-web-worker");

test("basics", function(){
	equal(typeof isWebWorker() , "boolean");
});
