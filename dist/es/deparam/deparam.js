import canDev from '../dev/dev.js';
import _canDeparam from '../../node_modules/can-deparam/dist/cjs/can-deparam.js';

let _moduleExports;

export default _moduleExports;

/**
 * @module can-util/js/deparam/deparam deparam
 * @parent can-util/js
 * @description Deprecated. Use [can-deparam] instead.
 */

//!steal-remove-start
canDev.warn('js/deparam/deparam is deprecated; please use can-deparam instead: https://github.com/canjs/can-deparam');
//!steal-remove-end

_moduleExports = _canDeparam;