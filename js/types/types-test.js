var QUnit = require('../../test/qunit');
var types = require('./types');

QUnit.module("can-util/js/types");

QUnit.test('types.isConstructor', function () {
	var Constructor = function(){};
	Constructor.prototype.method = function(){};

	ok(types.isConstructor(Constructor));
	ok(!types.isConstructor(Constructor.prototype.method));

});
