/**
 * @function can-util/dom/child-nodes childNodes
 * @parent can-util/dom
 * @description Get all of the childNodes of a given node.
 * @signature `childNodes(node)`
 * @param {Object} node The Node that you want child nodes for.
 */

function childNodes(node) {
	var childNodes = node.childNodes;
	if ("length" in childNodes) {
		return childNodes;
	} else {
		var cur = node.firstChild;
		var nodes = [];
		while (cur) {
			nodes.push(cur);
			cur = cur.nextSibling;
		}
		return nodes;
	}
}

module.exports = childNodes;
