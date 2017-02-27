@module {function} can-util/js/param/param param
@parent can-util/js
@description Serialize an object or array into a query string.

@signature `param(object)`

Serializes an object or array into a query string useful for making Ajax requests. `param` handles nested objects and arrays.  It uses `encodeURIComponent` to
escape values and keys.

```js
var deparam = require("can-util/js/param/param");

param({foo: "bar"})          //-> "foo=bar"
param({foo: ["bar", "baz"]}) //-> "foo[]=bar&foo[]=baz"
param({foo: {bar: "baz"}})    //-> "foo[bar]=baz"
param({foo: "bar & baz"})    //-> "foo=bar%20%26%20baz"
```

This is exported as `param` on [can-namespace].

@param {Object} object An object or array..
@return {String} The params formatted into an form-encoded string.
