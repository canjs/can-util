var getGlobal = require('../js/global/global');
var domEvents = require('../dom/events/events');
var buildFrag = require('../dom/fragment/fragment');

function bubbleDetector (didDetect, isBubbling) {
	return function () {
		if (!didDetect) {
			didDetect = true;
			var frag = buildFrag("<div><span></span></div>");

			frag.firstChild.addEventListener('click', function() {
				isBubbling = true;
			});

			domEvents.dispatch.call(frag.firstChild.firstChild, 'click');
		}

		return isBubbling;
	}
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
	return !!root.process;
}

module.exports = {
	hasBubblingEvents: bubbleDetector(false, false),
	isProduction: isProduction,
	isServer: isServer
};
