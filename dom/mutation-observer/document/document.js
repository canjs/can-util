var getDocument = require("../../document/document");
var domData = require("../../data/data");

var each = require("../../../js/each/each");
var CIDStore = require("../../../js/cid-set/cid-set");
var makeArray = require("../../../js/make-array/make-array");

var dispatchIfListening = function(mutatedNode, nodes, dispatched){
	if(dispatched.has(mutatedNode)) {
		return true;
	}
	dispatched.add(mutatedNode);

	if(nodes.name === "removedNodes") {
		var documentElement = getDocument().documentElement;
		if(documentElement.contains(mutatedNode)) {
			return;
		}
	}

	nodes.handlers.forEach(function(handler){
		handler(mutatedNode);
	});
	nodes.afterHandlers.forEach(function(handler){
		handler(mutatedNode);
	});
};


var mutationObserverDocument = {
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

var makeMutationMethods = function(name){
	var mutationName = name.toLowerCase() + "Nodes";

	var mutationData = {
		name: mutationName,
		handlers: [],
		afterHandlers: [],
		hander: null
	};

	var setup = function(){
		if( mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0 ) {

			mutationData.handler = function(mutations){
				var dispatched = new CIDStore();

				mutations.forEach(function(mutation){
					each(mutation[mutationName],function(mutatedNode){
						var children = mutatedNode.getElementsByTagName && makeArray( mutatedNode.getElementsByTagName("*") );

						var alreadyChecked = dispatchIfListening(mutatedNode, mutationData, dispatched);
						if(children && !alreadyChecked) {
							for (var j = 0, child;
								(child = children[j]) !== undefined; j++) {
								dispatchIfListening(child, mutationData, dispatched);
							}
						}
					});
				});
			};
			this.add(mutationData.handler);
		}
	};

	var teardown = function(){
		if( mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0 ) {
			this.remove(mutationData.handler);
		}
	};

	mutationObserverDocument[name+"Nodes"] = function(handler){
		setup.call(this);
		mutationData.handlers.push(handler);
	};
	mutationObserverDocument["after"+name+"Nodes"] = function(handler){
		setup.call(this);
		mutationData.afterHandlers.push(handler);
	};

	mutationObserverDocument[name+"NodesOff"] = function(handler){
		var index = mutationData.handlers.indexOf(handler);
		if(index >=0 ) {
			mutationData.handlers.splice(index, 1);
		}
		teardown.call(this);
	};
	mutationObserverDocument["after"+name+"NodesOff"] = function(handler){
		var index = mutationData.afterHandlers.indexOf(handler);
		if(index >=0 ) {
			mutationData.afterHandlers.splice(index, 1);
		}
		teardown.call(this);
	};
};

makeMutationMethods("added");
makeMutationMethods("removed");

module.exports = mutationObserverDocument;
