// This sts up an inserted event to work through mutation observers if
// mutation observers are present.  If they aren't you have to use
// the mutate methods.

var isEmptyObject = require("../../../js/isEmptyObject/");
var assign = require("../../../js/assign/");
var each = require("../../../js/each/");

var events = require("../events");
var isOfGlobalDocument = require("../../isOfGlobalDocument/");
var domData = require("../../data/");
var getMutationObserver = require("../../mutationObserver/");
var domDispatch = require("../../dispatch/");
var mutationDocument = require("../../mutationObserver/document/");
var getDocument = require("../../document/");


module.exports = function(specialEventName, mutationNodesProperty){
	var originalAdd = events.addEventListener,
		originalRemove = events.removeEventListener;

	events.addEventListener = function(eventName){
		// on an inserted event
		// if it's the first inserted event, we'll register a handler to the
		// mutationDocument singleton.  This will take nodes that are added
		// and fire add / remove events.
		if(eventName === specialEventName && getMutationObserver()) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement,specialEventName+"Data");
			if(!specialEventData) {
				specialEventData = {
					handler: function(mutations){
						mutations.forEach(function(mutation){
							each(mutation[mutationNodesProperty],function(mutatedNode){
								if(specialEventData.nodeIdsRespondingToInsert[ domData.getCid.call(mutatedNode) ]) {
									domDispatch.call(mutatedNode, specialEventName, [], false);
								}
							})
						})
					},
					nodeIdsRespondingToInsert: {}
				}
				mutationDocument.add(specialEventData.handler);
				domData.set.call(documentElement,specialEventName+"Data", specialEventData);
			}
			specialEventData.nodeIdsRespondingToInsert[ domData.cid.call(this) ] = true;
		}
		return originalAdd.apply(this, arguments);

	};

	events.removeEventListener = function(eventName){
		if(eventName === specialEventName && getMutationObserver() ) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement,specialEventName+"Data");
			if(specialEventData) {
				delete specialEventData.nodeIdsRespondingToInsert[domData.getCid.call(this)];
				if(isEmptyObject(specialEventData.nodeIdsRespondingToInsert)) {
					mutationDocument.remove(specialEventData.handler);
					domData.clean.call(documentElement,specialEventName+"Data");
				}
			}
		}
		return originalRemove.apply(this, arguments);
	};
};
