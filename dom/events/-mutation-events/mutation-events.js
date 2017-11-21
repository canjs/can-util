'use strict';

var domMutate = require('can-dom-mutate');
var makeMutationEvent = require('./make-mutation-event');
var addEventCompat = require('can-dom-events/helpers/add-event-compat');

module.exports = {
	attributes: function (domEvents, eventType) {
		var attributesEvent = makeMutationEvent(
			'attributes',
			domMutate.onNodeAttributeChange,
			{
				dispatchUnmanaged: domMutate.onAttributeChange,
				unmanagedEventType: eventType
			}
		);

		return addEventCompat(domEvents, attributesEvent, eventType);
	},
	inserted: function (domEvents, eventType) {
		var insertedEvent = makeMutationEvent(
			'inserted',
			domMutate.onNodeInsertion,
			{
				dispatchOnce: true,
				dispatchUnmanaged: domMutate.onInsertion,
				targetMustBeInsideDocument: true,
				unmanagedEventType: eventType
			}
		);

		return addEventCompat(domEvents, insertedEvent, eventType);
	},
	removed: function (domEvents, eventType) {
		var removedEvent = makeMutationEvent(
			'removed',
			domMutate.onNodeRemoval,
			{
				dispatchOnce: true,
				deleteDomData: true,
				dispatchUnmanaged: domMutate.onRemoval,
				targetMustBeOutsideDocument: true,
				unmanagedEventType: eventType
			}
		);

		return addEventCompat(domEvents, removedEvent, eventType);
	}
};
