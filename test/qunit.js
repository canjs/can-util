// mocha-qunit-ui adds a global QUnit. If it does not exist return steal-qunit
if(typeof QUnit === 'undefined') {
	module.exports = require('steal-qunit');
} else {
	// Those are different for mocha-qunit-ui
	QUnit.test = test;
	module.exports =  QUnit;
}
