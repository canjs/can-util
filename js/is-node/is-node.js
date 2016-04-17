module.exports = function(){
	return typeof process === "object" &&
		{}.toString.call(process) === "[object process]";
};
