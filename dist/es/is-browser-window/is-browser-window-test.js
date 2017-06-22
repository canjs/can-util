import QUnit from '../../test/qunit.js';
import isBrowserWindow from './is-browser-window.js';

QUnit.module("can-util/js/is-browser-window");

QUnit.test("basics", function () {
	equal(typeof isBrowserWindow(), "boolean");
});