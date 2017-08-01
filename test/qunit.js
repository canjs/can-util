
var isMochaQUnitUI = typeof QUnit !== 'undefined'
if (!isMochaQUnitUI) {
	module.exports = require('steal-qunit');
} else {
	// mocha-qunit-ui does not support async
	QUnit.assert.async = function () {
		QUnit.stop();
		return function done (error) {
			if (error) {
				return QUnit.ok(false, '' + error);
			}
			QUnit.start();
		};
	};

	QUnit.test = test;
	module.exports =  QUnit;
}
