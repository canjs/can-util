var deepAssign = require('./js/deep-assign/');
var namespace = require('./namespace');

module.exports = deepAssign(namespace, require('./dom/'), require('./js/'));
