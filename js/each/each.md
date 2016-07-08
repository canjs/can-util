@module {function} can-util/js/each/each each
@parent can-util/js

@signature `each(elements, callback, context)`

Loop over each element in an Array-Like data structure.

  @param {Object|ArrayLike} elements
  @param {function(element, key, elements)} callback
  @param {Object} [context] the context object

  @return {ArrayLike}  the orignal array of elements

```js
 var each = require("can-util/js/each/each");
 
 each([2,1,0], function(i) { console.log(this[i]); }, [4,5,6]); // -> 6 \n 5 \n 4
```
