@module {function} can-util/js/each/each each
@parent can-util/js

@signature `each(collection, callback, context)`

Loop over each element in an Array-Like or Object data structure.

  @param {Object|ArrayLike} collection
  @param {function(element, key, collection)} callback
  @param {Object} [context] the context object

  @return {collection}  the orignal collection

```js
 var each = require("can-util/js/each/each");
 
 each([2,1,0], function(i) { console.log(this[i]); }, [4,5,6]); // -> 6 \n 5 \n 4
 each({foo: 'bar', abc: 'xyz'}, function(val, key) {
     console.log(key + ': ' + val);
 }); // -> "foo: bar" \n "abc: xyz"
```
