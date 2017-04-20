'use strict';

var QUnit = require("../../test/qunit");
var canLog = require("./log");

if(typeof console !== "undefined") {

	QUnit.module("can-util/js/log");

	QUnit.test("log.log works", function(){
		QUnit.expect(2);
		var log = console.log;
		console.log = function(type, msg){
			QUnit.equal(type, "INFO:");
			QUnit.equal(msg, "it worked");
			console.log = log;
		};

		canLog.log("it worked");
	});

	QUnit.test("log.warn works", function(){
		QUnit.expect(2);
		var warn = console.warn;
		console.warn = function(type, msg){
			QUnit.equal(type, "WARN:");
			QUnit.equal(msg, "it worked");
			console.warn = warn;
		};

		canLog.warn("it worked");
	});

	QUnit.test("log.error works", function(){
		QUnit.expect(2);
		var error = console.error;
		console.error = function(type, msg){
			QUnit.equal(type, "ERROR:");
			QUnit.equal(msg, "an error");
			console.error = error;
		};

		canLog.error("an error");
	});
}
