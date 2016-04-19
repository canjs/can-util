module.exports = function(){
	return typeof window !== "undefined" &&
		typeof document !== "undefined" && typeof SimpleDOM === "undefined";
};
