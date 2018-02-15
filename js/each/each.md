@module {function} can-util/js/each/each each
@parent can-util/js

@signature `each(elements, callback, context)`

A generic iterator function that can be used to iterate over both Array-Like and object data structure. Array-Like data structures are iterated by their numerical index. Objects are iterated by their named properties, i.e. in each stage of iteration the each function emits the key and its corresponding value.

  @param {Object|ArrayLike} [elements] the object or Array-Like elements to iterate over
  @param {function(element, key, elements)} [callback] the function that would be executed in each iteration
  @param {Object} [context] the context object

  @return {Object|ArrayLike}  the original elements

```js
import each from "can-util/js/each/each";

each( [ 2, 1, 0 ], function( i ) {
	console.log( this[ i ] );
}, [ 4, 5, 6 ] ); // -> 6 \n 5 \n 4
each( { foo: "bar", abc: "xyz" }, function( val, key ) {
	console.log( key + ": " + val );
} ); // -> "foo: bar" \n "abc: xyz"
```
