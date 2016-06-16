# can-util

[![Build Status](https://travis-ci.org/canjs/can-util.png?branch=master)](https://travis-ci.org/canjs/can-util)

Common utilities for CanJS projects

- <code>[__can-util/dom__ Object](#can-utildom-object)</code>
  - <code>[__can-util/dom/child-nodes/child-nodes__ function](#can-utildomchild-nodeschild-nodes-function)</code>
    - <code>[childNodes(node)](#childnodesnode)</code>
  - <code>[__can-util/dom/data/data__ Object](#can-utildomdatadata-object)</code>
    - <code>[domData.get.call(el, key)](#domdatagetcallel-key)</code>
    - <code>[domData.set.call(el, key, value)](#domdatasetcallel-key-value)</code>
  - <code>[__can-util/dom/dispatch/dispatch__ function](#can-utildomdispatchdispatch-function)</code>
    - <code>[dispatch.call(el, event, args, bubbles)](#dispatchcallel-event-args-bubbles)</code>
  - <code>[__can-util/dom/mutate/mutate__ Object](#can-utildommutatemutate-object)</code>
    - <code>[mutate.appendChild.call(el, child)](#mutateappendchildcallel-child)</code>
    - <code>[mutate.insertBefore.call(el, ref, child)](#mutateinsertbeforecallel-ref-child)</code>
    - <code>[mutate.removeChild.call(el, child)](#mutateremovechildcallel-child)</code>
    - <code>[mutate.replaceChild.call(el, child)](#mutatereplacechildcallel-child)</code>
- <code>[__can-util/js__ Object](#can-utiljs-object)</code>
  - <code>[__can-util/js/assign/assign__ function](#can-utiljsassignassign-function)</code>
    - <code>[assign(target, source)](#assigntarget-source)</code>
  - <code>[__can-util/js/deep-assign/deep-assign__ function](#can-utiljsdeep-assigndeep-assign-function)</code>
    - <code>[deepAssign(target, [ ... sources ])](#deepassigntarget---sources-)</code>
  - <code>[__can-util/js/each/each__ function](#can-utiljseacheach-function)</code>
    - <code>[each(elements, callback, context)](#eachelements-callback-context)</code>
  - <code>[__can-util/js/global/global__ function](#can-utiljsglobalglobal-function)</code>
    - <code>[GLOBAL()](#global)</code>
  - <code>[__can-util/js/import/import__ function](#can-utiljsimportimport-function)</code>
    - <code>[importModule(moduleName, parentName)](#importmodulemodulename-parentname)</code>
  - <code>[__can-util/js/is-array-like/is-array-like__ function](#can-utiljsis-array-likeis-array-like-function)</code>
    - <code>[isArrayLike(obj)](#isarraylikeobj)</code>
  - <code>[__can-util/js/is-browser-window/is-browser-window__ function](#can-utiljsis-browser-windowis-browser-window-function)</code>
    - <code>[isBrowserWindow()](#isbrowserwindow)</code>
  - <code>[__can-util/js/is-web-worker/is-web-worker__ function](#can-utiljsis-web-workeris-web-worker-function)</code>
    - <code>[isWebWorker()](#iswebworker)</code>
  - <code>[__can-util/js/is-node/is-node__ function](#can-utiljsis-nodeis-node-function)</code>
    - <code>[isNode()](#isnode)</code>
  - <code>[__can-util/js/is-empty-object/is-empty-object__ function](#can-utiljsis-empty-objectis-empty-object-function)</code>
    - <code>[isEmptyObject(obj)](#isemptyobjectobj)</code>
  - _can-util/js/is-function/is-function_
  - <code>[__can-util/js/is-plain-object/is-plain-object__ function](#can-utiljsis-plain-objectis-plain-object-function)</code>
    - <code>[isPlainObject(obj)](#isplainobjectobj)</code>
  - <code>[__can-util/js/is-promise/is-promise__ function](#can-utiljsis-promiseis-promise-function)</code>
    - <code>[isPromise(obj)](#ispromiseobj)</code>
  - <code>[__can-util/js/is-string/is-string__ function](#can-utiljsis-stringis-string-function)</code>
    - <code>[isString(obj)](#isstringobj)</code>
  - <code>[__can-util/js/join-uris/join-uris__ function](#can-utiljsjoin-urisjoin-uris-function)</code>
    - <code>[joinURIs(base, href)](#joinurisbase-href)</code>

## API

## can-util/dom `{Object}`

A collection of modules that operate on DOM. 



### <code>Object</code>


### <code>__can-util/dom/child-nodes/child-nodes__ function</code>


#### <code>childNodes(node)</code>


Get all of the childNodes of a given node.

```js
var stache = require("can-stache");
var childNodes = require("can-util/child-nodes/child-nodes");

var html = "<div><h1><span></span></h1></div>";
var frag = stache(html)();

console.log(childNodes(frag)[0].nodeName); // -> DIV
```


1. __node__ <code>{Object}</code>:
  The Node that you want child nodes for.
  
### domData `{Object}`

Allows associating data as a key/value pair for a particular DOM Node.

```js
var domData = require("can-util/dom/data/data");
```




#### <code>Object</code>


#### <code>domData.get.call(el, key)</code>


Get data that was stored in a DOM Node using the specified `key`.

```js
var metadata = domData.get.call(el, "metadata");
```


1. __key__ <code>{String}</code>:
  A string used as a unique key for storing data associated with this DOM Node.
   

#### <code>domData.set.call(el, key, value)</code>


Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.

```js
domData.set.call(el, "metadata", {
  foo: "bar"
});
```
 

### <code>__can-util/dom/dispatch/dispatch__ function</code>


#### <code>dispatch.call(el, event, args, bubbles)</code>


Dispatch an event on an element.


1. __event__ <code>{Object|String}</code>:
  An object specifies options applied to this event.
1. __args__ <code>{Array}</code>:
  Arguments passed into this event.
1. __bubbles__ <code>{Boolean}</code>:
  Specifies whether this event should bubble (by default it will).
  
### can-util/dom/mutate/mutate `{Object}`

Mutate an element by appending, inserting, and removing DOM nodes. Use this so that on the server "inserted" will be fired. 
```js
var mutate = require("can-util/dom/mutate/mutate");

var el = document.createElement("div");

el.addEventListener("inserted", function(){
  console.log("Inserted was fired!");
});

mutate.appendChild.call(document.body, el);
```




#### <code>Object</code>


#### <code>mutate.appendChild.call(el, child)</code>

Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `can.inserted` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
 

#### <code>mutate.insertBefore.call(el, ref, child)</code>

Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
 

#### <code>mutate.removeChild.call(el, child)</code>

Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
 

#### <code>mutate.replaceChild.call(el, child)</code>

Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
 
## can-util/js `{Object}`

Utilities for manipulating JavaScript data structures. 



### <code>Object</code>


### <code>__can-util/js/assign/assign__ function</code>


#### <code>assign(target, source)</code>


A simplified version of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which only accepts a single source argument.

```js
var assign = require("can-util/js/assign/assign");

var obj = {};

assign(obj, {
  foo: "bar"
});

console.log(obj.foo); // -> "bar"
```


1. __target__ <code>{Object}</code>:
  The destination object. This object's properties will be mutated based on the object provided as `source`.
1. __source__ <code>{Object}</code>:
  The source object whose own properties will be applied to `target`.
  

- __returns__ <code>{Object}</code>:
  Returns the `target` argument.
  

### <code>__can-util/js/deep-assign/deep-assign__ function</code>


#### <code>deepAssign(target, [ ... sources ])</code>


Assign properties from a source object to a target object, deeply copying properties that are objects or arrays.

```js
var deepAssign = require("can-util/js/deep-assign/deep-assign");

var dest = deepAssign({}, {
  obj: {
		foo: "bar"
	}
}, {
  arr: [{ hello: "world" }]
});

console.log(dest.obj.foo); // -> "bar"
```


1. __target__ <code>{Object}</code>:
  The target object who's properties will be assigned from the source objects.
1. __source__ <code>{Object}</code>:
  Source objects from which properties will be assigned to the `target` object. Sources will be copied deeply; meaning any object or array properties will be traversed and copied (like a clone).
  

### <code>__can-util/js/each/each__ function</code>


#### <code>each(elements, callback, context)</code>


Loop over each element in an Array-Like data structure.


1. __elements__ <code>{Object|ArrayLike}</code>:
  
1. __callback__ <code>{function(element, key, elements)}</code>:
  
1. __context__ <code>{Object}</code>:
  the context object
  

### <code>__can-util/js/global/global__ function</code>


#### <code>GLOBAL()</code>


Returns the global that this environment provides. It will be one of:

* **Browser**: `window`
* **Web Worker**: `self`
* **Node.js**: `global`

```js
var GLOBAL = require("can-util/js/global/global");

var g = GLOBAL();

// In a browser
console.log(g === window); // -> true
```


- __returns__ <code>{Object}</code>:
  The global object for this JavaScript environment.
  

### <code>__can-util/js/import/import__ function</code>


#### <code>importModule(moduleName, parentName)</code>


```js
var importModule = require("can-util/js/import/import");

importModule("foo.stache").then(function(){
  // module was imported
});
```


1. __moduleName__ <code>{String}</code>:
  The module to be imported.
1. __parentName__ <code>{String}</code>:
  A parent module that will be used as a reference for resolving relative module imports.

- __returns__ <code>{Promise}</code>:
  A Promise that will resolve when the module has been imported.
  

### <code>__can-util/js/is-array-like/is-array-like__ function</code>


#### <code>isArrayLike(obj)</code>


Determines if an object is "array like", meaning it can be looped over. Any object with a `.length` property is array like.

```js
var isArrayLike = require("can-util/js/is-array-like/is-array-like");

// Arrays
console.log(isArrayLike([{ foo: "bar" }])); // -> true

// Strings
console.log(isArrayLike("some string")); // -> true

// Objects with .length property
console.log(isArrayLike({ length: 11 })); // -> true

// Numbers and Booleans are not.
console.log(isArrayLike(true)); // -> false
console.log(isArrayLike(13)); // -> false
```


1. __obj__ <code>{*}</code>:
  Any object type.

- __returns__ <code>{Boolean}</code>:
  True, if the object is similar to an array.
  

### <code>__can-util/js/is-browser-window/is-browser-window__ function</code>


#### <code>isBrowserWindow()</code>


Returns `true` if the code is running within a Browser window. Use this function if you need special code paths for when running in a Browser window, a Web Worker, or another environment (such as Node.js).

```js
var isBrowserWindow = require("can-util/js/is-browser-window/is-browser-window");
var GLOBAL = require("can-util/js/global/global");

if(isBrowserWindow()) {
  console.log(GLOBAL() === window); // -> true
}
```


- __returns__ <code>{Boolean}</code>:
  True if the environment is a Browser window.
  

### <code>__can-util/js/is-web-worker/is-web-worker__ function</code>
Determines if the code is running with a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). 

#### <code>isWebWorker()</code>


```js
var isWebWorker = require("can-util/js/is-web-worker/is-web-worker");
var GLOBAL = require("can-util/js/global/global");

if(isWebWorker()) {
  console.log(GLOBAL() === self); // -> true
}
```


- __returns__ <code>{Boolean}</code>:
  True if running in a Web Worker.
  

### <code>__can-util/js/is-node/is-node__ function</code>
Determines if your code is running in [Node.js](https://nodejs.org). 

#### <code>isNode()</code>


```js
var isNode = require("can-util/js/is-node/is-node");
var GLOBAL = require("can-util/js/global/global");

if(isNode()) {
  console.log(GLOBAL() === global); // -> true
}
```


- __returns__ <code>{Boolean}</code>:
  True if running in Node.js
  

### <code>__can-util/js/is-empty-object/is-empty-object__ function</code>


#### <code>isEmptyObject(obj)</code>


Used to determine if an object is an empty object (an object with no properties) such as `{}`.

```js
var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");

console.log(isEmptyObject({})); // -> true

console.log(isEmptyObject({ a: 1 })); // -> false
```


1. __obj__ <code>{Object}</code>:
  Any object.

- __returns__ <code>{Boolean}</code>:
  True if the object is an object with no properties.
  

### <code>__can-util/js/is-plain-object/is-plain-object__ function</code>


#### <code>isPlainObject(obj)</code>


Attempts to determine if an object is a plain object like those you would create using the curly braces syntax: `{}`. The following are not plain objects:

1. Objects with prototypes (created using the `new` keyword).
2. Booleans.
3. Numbers.
4. NaN.

```js
var isPlainObject = require("can-util/js/is-plain-object/is-plain-object");

// Created with {}
console.log(isPlainObject({})); // -> true

// new Object
console.log(isPlainObject(new Object())); // -> true

// Custom object
var Ctr = function(){};
var obj = new Ctr();

console.log(isPlainObject(obj)); // -> false
```


1. __obj__ <code>{Object}</code>:
  

- __returns__ <code>{Boolean}</code>:
  
  

### <code>__can-util/js/is-promise/is-promise__ function</code>


#### <code>isPromise(obj)</code>


Determines if an object is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```js
var isPromise = require("can-util/js/is-promise/is-promise");

var promise = new Promise(function(resolve){
  resolve();
});

console.log(isPromise(promise)); // -> true
console.log(isPromise("foo bar")); // -> false
```


1. __obj__ <code>{Object}</code>:
  An object to be tested.

- __returns__ <code>{Boolean}</code>:
  True if the object is a Promise.
  

### <code>__can-util/js/is-string/is-string__ function</code>
Determines if the provided argument is a string. 

#### <code>isString(obj)</code>


```js
var isString = require("can-util/js/is-string/is-string");

console.log(isString("foo")); // -> true
console.log(isString(String("foo")); // -> true

console.log(isString({})); // -> false
```


1. __obj__ <code>{*}</code>:
  An object to test if is a string.

- __returns__ <code>{Boolean}</code>:
  True if the object is a string.
  

### <code>__can-util/js/join-uris/join-uris__ function</code>
Join together a URI path to a base. 

#### <code>joinURIs(base, href)</code>


Provides a convenient way to join together URIs handling relative paths.

```js
var joinURIs = require("can-util/js/join-uris");

var base = "http://example.com/some/long/path";
var href = "../../images/foo.png";

var res = joinURIs(base, href);

console.log(res); // -> http://example.com/images/foo.png
```


1. __base__ <code>{String}</code>:
  
1. __href__ <code>{String}</code>:
  

- __returns__ <code>{String}</code>:
  The result of joining the two parts.
    
## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
