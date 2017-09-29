'use strict';

var getDocument = require('can-globals/document/document');
var domDataState = require("can-dom-data-state");
var getMutationObserver = require("can-globals/mutation-observer/mutation-observer");
var each = require("../../../js/each/each");
var CIDStore = require("can-cid/set/set");
var makeArray = require("../../../js/make-array/make-array");
var string = require("../../../js/string/string");

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
	add: function(handler) {
		var MO = getMutationObserver();
		if (MO) {
			var documentElement = getDocument().documentElement;
			var globalObserverData = domDataState.get.call(documentElement, "globalObserverData");
			if(!globalObserverData) {
				var observer = new MO(function (mutations) {
					globalObserverData.handlers.forEach(function(handler){
						handler(mutations);
					});
				});
				observer.observe(documentElement, {childList: true, subtree: true});

				globalObserverData = {
					observer: observer,
					handlers: []
				};
				domDataState.set.call(documentElement, "globalObserverData", globalObserverData);
			}
			globalObserverData.handlers.push(handler);
		}
	},
	remove: function(handler){
		var documentElement = getDocument().documentElement;
		var globalObserverData = domDataState.get.call(documentElement, "globalObserverData");
		if(globalObserverData) {
			var index = globalObserverData.handlers.indexOf(handler);
			if(index >= 0) {
				globalObserverData.handlers.splice(index, 1);
			}
			if(globalObserverData.handlers.length === 0 ){
				globalObserverData.observer.disconnect();
				domDataState.clean.call(documentElement, "globalObserverData");
			}
		}
	}
};

var makeMutationMethods = function(name) {
	var mutationName = name.toLowerCase() + "Nodes";

	var getMutationData = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = domDataState.get.call(documentElement, mutationName + "MutationData");

		if(!mutationData) {
			mutationData = {
				name: mutationName,
				handlers: [],
				afterHandlers: [],
				hander: null
			};
			if (getMutationObserver()) {
				domDataState.set.call(documentElement, mutationName + "MutationData", mutationData);
			}
		}
		return mutationData;
	};

	var setup = function() {
		var mutationData = getMutationData();

		if( mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0 ) {
			mutationData.handler = function(mutations){
				var dispatched = new CIDStore();

				mutations.forEach(function(mutation){
					each(mutation[mutationName], function(mutatedNode){
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
		return mutationData;
	};

	var teardown = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = getMutationData();
		if( mutationData.handlers.length === 0 && mutationData.afterHandlers.length === 0 ) {
			this.remove(mutationData.handler);
			domDataState.clean.call(documentElement, mutationName + "MutationData");
		}
	};

	var createOnOffHandlers = function(name, handlerList) {
		mutationObserverDocument["on" + name] = function(handler) {
			var mutationData = setup.call(this);
			mutationData[handlerList].push(handler);
		};

		mutationObserverDocument["off" + name] = function(handler) {
			var mutationData = getMutationData();
			var index = mutationData[handlerList].indexOf(handler);
			if(index >=0 ) {
				mutationData[handlerList].splice(index, 1);
			}
			teardown.call(this);
		};
	};

	var createHandlers = function(name) {
		createOnOffHandlers(name, "handlers");
		createOnOffHandlers("After" + name, "afterHandlers");
	};

	createHandlers(string.capitalize(mutationName));
};

makeMutationMethods("added");
makeMutationMethods("removed");

module.exports = mutationObserverDocument;
