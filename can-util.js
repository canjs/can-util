var deepAssign = require('./js/deep-assign/deep-assign');
var omit = require('./js/omit/omit');
var namespace = require('can-namespace');

module.exports = deepAssign(namespace, require('./dom/dom'), omit(require('./js/js'), [ 'cid', 'types' ]));
