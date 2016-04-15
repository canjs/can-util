module.exports = function(obj){
	return !!obj && (
		(window.Promise && (obj instanceof Promise)) ||
		(can.isFunction(obj.then) /*&& (can.List === undefined || !(obj instanceof can.List))*/ )
	);
};
