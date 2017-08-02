var getGlobal = require('../js/global/global');
var domEvents = require('../dom/events/events');
var buildFrag = require('../dom/fragment/fragment');

var eventsBubble = (function() {
	var frag = buildFrag("<div><span></span></div>");
	var bubbles = false;

	frag.firstChild.addEventListener('click', function() {
		bubbles = true;
	});

	domEvents.dispatch.call(frag.firstChild.firstChild, 'click');

	return bubbles;
})();

function hasBubblingEvents () {
	return eventsBubble;
}

function isProduction () {
	var root = getGlobal();

	if (root.System) {
		return root.System.env.indexOf('production') !== -1;
	}

	if (root.process) {
		var nodeEnv = root.process.env.NODE_ENV;
		return nodeEnv === 'production' || nodeEnv === 'window-production';
	}

	return false;
}

function isServer () {
	var root = getGlobal();
	var testType = root.process && root.process.env.TEST;
	return testType === 'qunit';
}

module.exports = {
	hasBubblingEvents: hasBubblingEvents,
	isProduction: isProduction,
	isServer: isServer
};
