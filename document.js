var bitDocs = require("bit-docs");
var path = require("path");

bitDocs(
	path.join(__dirname, "package.json"),
	{
		debug: true,
		readme: {
			apis: [
				{"can-util/dom": [
					"can-util/dom/child-nodes",
					{"can-util/dom/data": [
						"can-util/dom/data.get",
						"can-util/dom/data.set"
					]},
					"can-util/dom/dispatch"
				]},
				{"can-util/js": [
					"can-util/js/assign",
					"can-util/js/deep-assign",
					"can-util/js/each",
					"can-util/js/global",
					"can-util/js/import",
					"can-util/js/is-array-like",
					"can-util/js/is-browser-window",
					"can-util/js/is-web-worker",
					"can-util/js/is-node",
					"can-util/js/is-empty-object",
					"can-util/js/is-function",
					"can-util/js/is-plain-object",
					"can-util/js/is-promise",
					"can-util/js/is-string",
					"can-util/js/join-uris",
					/*"can-util/js/last",
					"can-util/js/set-immediate",
					"can-util/js/string",
					"can-util/js/types"*/
				]}
			]
		}
	}
).catch(function(e){
	setTimeout(function(){
		throw e;
	}, 1);
});
