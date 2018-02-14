@module {function} can-util/js/is-array-like/is-array-like is-array-like
@parent can-util/js
@signature `isArrayLike(obj)`

Determines if an object is "array like", meaning it can be looped over. Any object with a `.length` property is array like.

```js
import isArrayLike from "can-util/js/is-array-like/is-array-like";

// Arrays
console.log( isArrayLike( [ { foo: "bar" } ] ) ); // -> true

// Strings
console.log( isArrayLike( "some string" ) ); // -> true

// Objects with .length property
console.log( isArrayLike( { length: 11 } ) ); // -> true

// Numbers and Booleans are not.
console.log( isArrayLike( true ) ); // -> false
console.log( isArrayLike( 13 ) ); // -> false
```

@param {*} obj Any object type.
@return {Boolean} True, if the object is similar to an array.
