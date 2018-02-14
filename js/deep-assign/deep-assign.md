@module {function} can-util/js/deep-assign/deep-assign deep-assign
@parent can-util/js
@signature `deepAssign(target, [ ... sources ])`

Assign properties from a source object to a target object, deeply copying properties that are objects or arrays.

```js
import deepAssign from "can-util/js/deep-assign/deep-assign";

const dest = deepAssign( {}, {
	obj: {
		foo: "bar"
	}
}, {
	arr: [ { hello: "world" } ]
} );

console.log( dest.obj.foo ); // -> "bar"
```

@param {Object} target The target object who's properties will be assigned from the source objects.
@param {...Object} source Source objects from which properties will be assigned to the `target` object. Sources will be copied deeply; meaning any object or array properties will be traversed and copied (like a clone).
