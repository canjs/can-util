import QUnit from '../../test/qunit';
import isPromise from '../is-promise/is-promise';
import makePromise from './make-promise';


QUnit.module("can-util/js/make-promise");

QUnit.test("basics", function () {
	var obj = {
		fail: function () {},
		then: function () {}
	};
	var promise = makePromise(obj);
	QUnit.ok(isPromise(promise));

	obj = {
		catch: function () {},
		then: function () {}
	};
	promise = makePromise(obj);
	QUnit.ok(isPromise(promise));
});