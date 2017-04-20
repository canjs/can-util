'use strict';

var QUnit = require('../../test/qunit');
var load = require('./import');
var isNode = require('../is-node/is-node')();

if(!isNode) {
	QUnit.module('can-util/js/import');

	if (__dirname !== '/') {
		QUnit.test('basic can-import works', function() {
			stop();

			load('can-util/js/import/testmodule', __dirname).then(function(data) {
				QUnit.equal(data, 'Hello world');
			}).then(null, function(err){
				QUnit.ok(false, err);
			}).then(start, start);
		});
	}
} else {
	QUnit.module('can-util/js/import - Node', {
		setup: function(){
			// Create a fake System.import
			this.oldSystem = global.System;
			global.System = {
				"import": function(name){
					name = name.replace("can-util", "");

					return new Promise(function(resolve, reject){
						try {
							var mod = require(process.cwd() + name);
							resolve(mod);
						} catch(err) {
							reject(err);
						}
					});
				}
			};
		},
		teardown: function(){
			global.System = this.oldSystem;
		}
	});

	QUnit.test('basic can-import works', function() {
		stop();
		load('can-util/js/import/testmodule', __dirname).then(function(data) {
			QUnit.equal(data, 'Hello world');
		}).then(null, function(err){
			QUnit.ok(false, err);
		}).then(start, start);
	});
}
