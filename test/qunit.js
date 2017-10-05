var testType = typeof process !== 'undefined' && process.env.TEST;
var isQunit = testType === 'qunit';

if (isQunit) {
	module.exports = require('qunitjs');
} else {
	module.exports = require('steal-qunit');
}
