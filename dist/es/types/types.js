import canDev from '../dev/dev.js';
import _canTypes from '../../node_modules/can-types/can-types.js';

let _moduleExports;

export default _moduleExports;

/**
 * @module can-util/js/types/types types
 * @parent can-util/js
 * @description Deprecated. Use [can-types] instead.
 */

//!steal-remove-start
canDev.warn('js/types/types is deprecated; please use can-types instead: https://github.com/canjs/can-types');
//!steal-remove-end

_moduleExports = _canTypes;