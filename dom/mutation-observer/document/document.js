var getDocument = require("../../document/document");
var domData = require("../../data/data");
module.exports = {
	add: function(handler){
		var documentElement = getDocument().documentElement;
		var globalObserverData = domData.get.call(documentElement,"globalObserverData");
		if(!globalObserverData) {

			var observer = new MutationObserver(function (mutations) {
				globalObserverData.handlers.forEach(function(handler){
					handler(mutations);
				});
			});
			observer.observe(documentElement, {childList: true, subtree: true});

			globalObserverData = {
				observer: observer,
				handlers: []
			};
			domData.set.call(documentElement,"globalObserverData", globalObserverData);
		}
		globalObserverData.handlers.push(handler);
	},
	remove: function(handler){
		var documentElement = getDocument().documentElement;
		var globalObserverData = domData.get.call(documentElement,"globalObserverData");
		if(globalObserverData) {
			var index = globalObserverData.handlers.indexOf(handler);
			if(index >= 0) {
				globalObserverData.handlers.splice(index, 1);
			}
			if(globalObserverData.handlers.length === 0 ){
				globalObserverData.observer.disconnect();
				domData.clean.call(documentElement,"globalObserverData");
			}
		}
	}
};
