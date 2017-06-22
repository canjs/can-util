import QUnit from '../../test/qunit';
import getGlobal from './global';
import isBrowserWindow from '../is-browser-window/is-browser-window';


QUnit.module("can-util/js/global");

test("basics", function () {
	if (isBrowserWindow()) {
		ok(getGlobal() === window);
	} else {
		ok(getGlobal() === global);
	}
});

if (!isBrowserWindow()) {
	QUnit.module("in Node with fake window", {
		setup: function () {
			this.oldWindow = global.window;
			global.window = {};
		},
		teardown: function () {
			global.window = this.oldWindow;
		}
	});

	test("Gets the Node global", function () {
		ok(getGlobal() === global);
	});
}