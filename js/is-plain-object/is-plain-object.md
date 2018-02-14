@module {function} can-util/js/is-plain-object/is-plain-object is-plain-object
@parent can-util/js
@signature `isPlainObject(obj)`

Attempts to determine if an object is a plain object like those you would create using the curly braces syntax: `{}`. The following are not plain objects:

1. Objects with prototypes (created using the `new` keyword).
2. Booleans.
3. Numbers.
4. NaN.

```js
import isPlainObject from "can-util/js/is-plain-object/is-plain-object";

// Created with {}
console.log( isPlainObject( {} ) ); // -> true

// new Object
console.log( isPlainObject( new Object() ) ); // -> true

// Custom object
const Ctr = function() {};
const obj = new Ctr();

console.log( isPlainObject( obj ) ); // -> false
```

@param {Object} obj
@return {Boolean}
