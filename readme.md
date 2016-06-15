# can-util

[![Build Status](https://travis-ci.org/canjs/can-util.png?branch=master)](https://travis-ci.org/canjs/can-util)

Common utilities for CanJS projects


- <code>[can-util/dom Object](#can-utildom-object)</code>
  - <code>[childNodes(node)](#childnodesnode)</code>
  - <code>[domData Object](#domdata-object)</code>
    - <code>[domData.get.call(el, key)](#domdatagetcallel-key)</code>
    - <code>[domData.set.call(el, key, value)](#domdatasetcallel-key-value)</code>
  - <code>[dispatch.call(el, event, args, bubbles)](#dispatchcallel-event-args-bubbles)</code>
- <code>[can-util/js Object](#can-utiljs-object)</code>
  - <code>[assign(target, source)](#assigntarget-source)</code>
  - <code>[deepAssign(target, [ ... sources ])](#deepassigntarget---sources-)</code>
  - <code>[each(elements, callback, context)](#eachelements-callback-context)</code>
  - <code>[GLOBAL()](#global)</code>
  - <code>[importModule(moduleName, parentName)](#importmodulemodulename-parentname)</code>
  - <code>[isArrayLike(obj)](#isarraylikeobj)</code>
  - <code>[isBrowserWindow()](#isbrowserwindow)</code>
  - <code>[isWebWorker()](#iswebworker)</code>
  - <code>[isNode()](#isnode)</code>
  - <code>[isEmptyObject(obj)](#isemptyobjectobj)</code>
  - <code>[isFunction(value)](#isfunctionvalue)</code>
  - <code>[isPlainObject(obj)](#isplainobjectobj)</code>
  - <code>[isPromise(obj)](#ispromiseobj)</code>
  - <code>[isString(obj)](#isstringobj)</code>
  - <code>[joinURIs(base, href)](#joinurisbase-href)</code>

## API

### can-util/dom `{Object}`

A collection of modules that operate on DOM. 



#### `Object`


#### `childNodes(node)`


1. __node__ <code>{Object}</code>:
  The Node that you want child nodes for.
  
#### domData `{Object}`

Allows associating data as a key/value pair for a particular DOM Node.

```
var domData = require("can-util/dom/data/data");
```




##### `Object`


##### `domData.get.call(el, key)`


Get data that was stored in a DOM Node using the specified `key`.

```js
var metadata = domData.get.call(el, "metadata");
```


1. __key__ <code>{String}</code>:
  A string used as a unique key for storing data associated with this DOM Node.
   

##### `domData.set.call(el, key, value)`


Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.

```js
domData.set.call(el, "metadata", {
  foo: "bar"
});
```
 

#### `dispatch.call(el, event, args, bubbles)`


1. __event__ <code>{Object|String}</code>:
  An object specifies options applied to this event.
1. __args__ <code>{Array}</code>:
  Arguments passed into this event.
1. __bubbles__ <code>{Boolean}</code>:
  Specifies whether this event should bubble (by default it will).
  
### can-util/js `{Object}`

Utilities for manipulating JavaScript data structures. 



#### `Object`


#### `assign(target, source)`


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
  

#### `deepAssign(target, [ ... sources ])`


Deeply assign properties to an object.

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
  

#### `each(elements, callback, context)`


1. __elements__ <code>{Object|ArrayLike}</code>:
  
1. __callback__ <code>{function(element, key, elements)}</code>:
  
1. __context__ <code>{Object}</code>:
  the context object
  

#### `GLOBAL()`


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
  

#### `importModule(moduleName, parentName)`


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
  

#### `isArrayLike(obj)`


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
  

#### `isBrowserWindow()`


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
  

#### `isWebWorker()`


```js
var isWebWorker = require("can-util/js/is-web-worker/is-web-worker");
var GLOBAL = require("can-util/js/global/global");

if(isWebWorker()) {
  console.log(GLOBAL() === self); // -> true
}
```


- __returns__ <code>{Boolean}</code>:
  True if running in a Web Worker.
  

#### `isNode()`


```js
var isNode = require("can-util/js/is-node/is-node");
var GLOBAL = require("can-util/js/global/global");

if(isNode()) {
  console.log(GLOBAL() === global); // -> true
}
```


- __returns__ <code>{Boolean}</code>:
  True if running in Node.js
  

#### `isEmptyObject(obj)`


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
  

#### `isFunction(value)`


```js
var isFunction = require("can-util/js/is-function/is-function");

console.log(isFunction(function(){})); // -> true

console.log(isFunction({})); // -> false
```


- __returns__ <code>{Boolean}</code>:
  True if the provided argument is a function.
  

#### `isPlainObject(obj)`


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
  
  

#### `isPromise(obj)`


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
  

#### `isString(obj)`


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
  

#### `joinURIs(base, href)`


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
