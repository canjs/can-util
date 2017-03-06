@module {function} can-util/js/join-uris/join-uris join-uris
@parent can-util/js
@description Join together a URI path to a base.
@signature `joinURIs(base, href)`

Provides a convenient way to join together URIs handling relative paths.

```js
var joinURIs = require("can-util/js/join-uris");

var base = "http://example.com/some/long/path";
var href = "../../images/foo.png";

var res = joinURIs(base, href);

console.log(res); // -> http://example.com/images/foo.png
```

@param {String} base
@param {String} href
@return {String} The result of joining the two parts.
