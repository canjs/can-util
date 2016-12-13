var deepAssign = require('./js/deep-assign/deep-assign');
var namespace = require('can-namespace');

module.exports = deepAssign(namespace, require('./dom/dom'), require('./js/js'));
