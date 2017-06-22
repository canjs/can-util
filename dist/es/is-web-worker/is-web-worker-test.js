import QUnit from '../../test/qunit.js';
import isWebWorker from './is-web-worker.js';

QUnit.module("can-util/js/is-web-worker");

QUnit.test("basics", function () {
	QUnit.equal(typeof isWebWorker(), "boolean");
});