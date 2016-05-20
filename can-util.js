var extend = require('./js/deep-extend/');
var namespace = require('./namespace');

module.exports = extend(namespace, require('./dom/'), require('./js/'));
