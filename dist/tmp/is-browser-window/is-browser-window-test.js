import QUnit from '../../test/qunit';
import isBrowserWindow from './is-browser-window';


QUnit.module("can-util/js/is-browser-window");

QUnit.test("basics", function () {
	equal(typeof isBrowserWindow(), "boolean");
});