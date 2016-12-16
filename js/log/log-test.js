var QUnit = require("../../test/qunit");
var canLog = require("./log");

if(typeof console !== "undefined") {

	QUnit.module("can-util/js/log");

	QUnit.test("log.log works", function(){
		QUnit.expect(2);
		var log = console.log;
		console.log = function(type, msg){
			QUnit.equal(type, "Info:");
			QUnit.equal(msg, "it worked");
			console.log = log;
		};

		canLog.log("it worked");
	});
}
