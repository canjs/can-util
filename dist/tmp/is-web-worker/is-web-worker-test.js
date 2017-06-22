import QUnit from '../../test/qunit';
import isWebWorker from './is-web-worker';


QUnit.module("can-util/js/is-web-worker");

QUnit.test("basics", function () {
	QUnit.equal(typeof isWebWorker(), "boolean");
});