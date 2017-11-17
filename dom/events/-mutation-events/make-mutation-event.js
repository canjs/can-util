'use strict';

var domData = require('can-dom-data-state');
var globals = require('can-globals');
var CIDMap = require('can-cid/map/map');
var CIDSet = require('can-cid/set/set');
var dispatchEvent = require('../events').dispatch;

function getDataKey(eventType, defaultEventType) {
	return eventType + defaultEventType + 'Data';
}

function deleteTargetData (docKey, eventType, target) {
	var doc = target.ownerDocument;
	var documentData = domData.get.call(doc, docKey);
	if (documentData) {
		var targetData = documentData.get(target);
		documentData['delete'](target);
		if (documentData.size === 0) {
			domData.clean.call(doc, docKey);
		}

		if (targetData) {
			if (targetData.removeListener) {
				targetData.removeListener();
				targetData.removeListener = null;
			}
			targetData.listeners.forEach(function (listener) {
				target.removeEventListener(eventType, listener);
			});
		}
	}
}

function makeMutationEvent(defaultEventType, subscription, options) {
	options = options || {};
	var dispatchOnce = options.dispatchOnce;
	var deleteDomData = options.deleteDomData;
	var targetMustBeInsideDocument = options.targetMustBeInsideDocument;
	var targetMustBeOutsideDocument = options.targetMustBeOutsideDocument;

	var inDocument = function (target) {
		var document = target.ownerDocument;
		if (!document.contains) {
			document = document.documentElement; // FIX for can-simple-dom
		}
		return document.contains(target);
	};

	var dispatch = function (eventType, dataKey, mutation) {
		var target = mutation.target;
		var isInDocument = inDocument(target);
		if (targetMustBeInsideDocument && !isInDocument) {
			return;
		}

		if (targetMustBeOutsideDocument && isInDocument) {
			return;
		}

		if (mutation.__didDispatch) {
			return;
		}
		mutation.__didDispatch = true;

		var eventData = {type: eventType};
		for (var key in mutation) {
			eventData[key] = mutation[key];
		}
		delete eventData.__didDispatch;

		dispatchEvent.call(target, eventData, [], false);

		if (deleteDomData) {
			// NOTE: The event will remove ALL dom data on the target
			// This is for backwards-compatibility with can-util/dom/events
			domData['delete'].call(target);
			deleteTargetData(dataKey, eventType, target);
		}

		return true;
	};

	var event = {
		defaultEventType: defaultEventType,
		addEventListener: function (target, eventType, handler) {
			var dataKey = getDataKey(eventType, defaultEventType);
			var doc = target.ownerDocument;
			var documentData = domData.get.call(doc, dataKey);
			if (!documentData) {
				documentData = new CIDMap();
				domData.set.call(doc, dataKey, documentData);
			}

			var data = documentData.get(target);
			if (!data) {
				data = {
					removeListener: null,
					listeners: new CIDSet()
				};
				documentData.set(target, data);
			}

			var isDuplicateHandler = data.listeners.has(handler);
			if (isDuplicateHandler) {
				return;
			}

			if (data.listeners.size === 0) {
				var removeListener = subscription(target, function (mutation) {
					var didDispatch = dispatch(eventType, dataKey, mutation);
					if (!didDispatch) {
						return;
					}

					if (dispatchOnce) {
						deleteTargetData(dataKey, eventType, target);
					}
				});
				data.removeListener = removeListener;
			}

			data.listeners.add(handler);
			target.addEventListener(eventType, handler);
		},
		removeEventListener: function (target, eventType, handler) {
			target.removeEventListener(eventType, handler);

			var dataKey = getDataKey(eventType, defaultEventType);
			var doc = target.ownerDocument;
			var documentData = domData.get.call(doc, dataKey);
			if (!documentData) {
				return;
			}

			var data = documentData.get(target);
			if (!data) {
				return;
			}

			data.listeners['delete'](handler);

			if (data.listeners.size === 0) {
				deleteTargetData(dataKey, eventType, target);
			}
		}
	};

	if (options.dispatchUnmanaged) {
		var dispatchUnmanaged = options.dispatchUnmanaged;
		var unmanagedEventType = options.unmanagedEventType;

		var setupDocumentSubscription = function (doc) {
			return dispatchUnmanaged(doc.documentElement, function unmanaged (mutation) {
				var dataKey = getDataKey(unmanagedEventType, defaultEventType);
				dispatch(unmanagedEventType, dataKey, mutation);
			});
		};

		var cancelDocumentSubscription;
		var doc = globals.getKeyValue('document');
		if (doc) {
			cancelDocumentSubscription = setupDocumentSubscription(doc);
		}
		globals.onKeyValue('document', function (doc) {
			if (cancelDocumentSubscription) {
				cancelDocumentSubscription();
				cancelDocumentSubscription = null;
			}

			cancelDocumentSubscription = setupDocumentSubscription(doc);
		});
	}

	return event;
}

module.exports = makeMutationEvent;
