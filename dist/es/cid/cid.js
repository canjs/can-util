import canDev from '../dev/dev.js';
import _canCid from '../../node_modules/can-cid/can-cid.js';

let _moduleExports;

export default _moduleExports;

/**
 * @module can-util/js/cid/cid cid
 * @parent can-util/js
 * @description Deprecated. Use [can-cid] instead.
 */

//!steal-remove-start
canDev.warn('js/cid/cid is deprecated; please use can-cid instead: https://github.com/canjs/can-cid');
//!steal-remove-end

_moduleExports = _canCid;