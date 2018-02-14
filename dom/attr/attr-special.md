@property {{}} can-util/dom/attr/attr.special special
@parent can-util/dom/attr/attr

An object used to set up special properties. Each key on `attr.special` is a name of a property/attribute that has special behaviors when being get, set, or bound to.

```js
attr.special.foo = {
	get: function() {
		return this.foo;
	},
	set: function( val ) {
		this.foo = val;
	},
	addEventListener: function() {

		// Listen to this property changing some how
	}
};
```

CanJS comes with a couple of special properties that can be used in bindings:

* [can-util/dom/attr/attr.special.values]
* [can-util/dom/attr/attr.special.focused]
