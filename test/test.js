require('../js/tests.js');
require('../dom/tests.js');

var domDispatch = require('can-util/dom/dispatch/');
var buildFrag = require('can-util/dom/fragment/');

window.eventsBubble = (function() {
	var frag = buildFrag("<div><span></span></div>");
	var bubbles = false;

	frag.firstChild.addEventListener('click', function() {
		bubbles = true;
	});
	
	domDispatch.call(frag.firstChild.firstChild, 'click');

	return bubbles;
})();
