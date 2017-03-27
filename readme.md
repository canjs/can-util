# can-util

[![Sauce Test Status](https://saucelabs.com/browser-matrix/can-util.svg)](https://saucelabs.com/u/can-util)

[![Build Status](https://travis-ci.org/canjs/can-util.png?branch=master)](https://travis-ci.org/canjs/can-util)

Common utilities for CanJS projects

- <code>[__can-util/dom__ Object](#can-utildom-object)</code>
  - <code>[__can-util/dom/ajax/ajax__ function](#can-utildomajaxajax-function)</code>
    - <code>[ajax(settings)](#ajaxsettings)</code>
  - <code>[__can-util/dom/child-nodes/child-nodes__ function](#can-utildomchild-nodeschild-nodes-function)</code>
    - <code>[childNodes(node)](#childnodesnode)</code>
  - <code>[__can-util/dom/class-name/class-name__ Object](#can-utildomclass-nameclass-name-object)</code>
    - <code>[className.add.call(el, cls)](#classnameaddcallel-cls)</code>
    - <code>[className.has.call(el, cls)](#classnamehascallel-cls)</code>
    - <code>[className.remove.call(el, cls)](#classnameremovecallel-cls)</code>
  - <code>[__can-util/dom/data/data__ Object](#can-utildomdatadata-object)</code>
    - <code>[domData.cid.call(el)](#domdatacidcallel)</code>
    - <code>[domData.clean.call(el, key)](#domdatacleancallel-key)</code>
    - <code>[domData.get.call(el, key)](#domdatagetcallel-key)</code>
    - <code>[domData.getCid.call(el)](#domdatagetcidcallel)</code>
    - <code>[domData.set.call(el, key, value)](#domdatasetcallel-key-value)</code>
  - <code>[__can-util/dom/dispatch/dispatch__ function](#can-utildomdispatchdispatch-function)</code>
    - <code>[dispatch.call(el, event, args, bubbles)](#dispatchcallel-event-args-bubbles)</code>
  - <code>[__can-util/dom/document/document__ function](#can-utildomdocumentdocument-function)</code>
    - <code>[document(document)](#documentdocument)</code>
  - <code>[__can-util/dom/events/events__ Object](#can-utildomeventsevents-object)</code>
    - <code>[__can-util/dom/events/attributes/attributes__ events](#can-utildomeventsattributesattributes-events)</code>
    - <code>[__can-util/dom/events/delegate/delegate__ events](#can-utildomeventsdelegatedelegate-events)</code>
    - <code>[__can-util/dom/events/inserted/inserted__ events](#can-utildomeventsinsertedinserted-events)</code>
    - <code>[__can-util/dom/events/make-mutation-event/make-mutation-event__ function](#can-utildomeventsmake-mutation-eventmake-mutation-event-function)</code>
      - <code>[makeMutationEvent(specialEventNae, mutationNodesProperty)](#makemutationeventspecialeventnae-mutationnodesproperty)</code>
    - <code>[__can-util/dom/events/removed/removed__ events](#can-utildomeventsremovedremoved-events)</code>
  - <code>[__can-util/dom/frag/frag__ function](#can-utildomfragfrag-function)</code>
    - <code>[frag: function(item, doc)](#frag-functionitem-doc)</code>
  - <code>[__can-util/dom/mutate/mutate__ Object](#can-utildommutatemutate-object)</code>
    - <code>[mutate.appendChild.call(el, child)](#mutateappendchildcallel-child)</code>
    - <code>[mutate.insertBefore.call(el, ref, child)](#mutateinsertbeforecallel-ref-child)</code>
    - <code>[mutate.removeChild.call(el, child)](#mutateremovechildcallel-child)</code>
    - <code>[mutate.replaceChild.call(el, child)](#mutatereplacechildcallel-child)</code>
- <code>[__can-util/js__ Object](#can-utiljs-object)</code>
  - <code>[__can-util/js/assign/assign__ function](#can-utiljsassignassign-function)</code>
    - <code>[assign(target, source)](#assigntarget-source)</code>
  - <code>[__can-util/js/base-url/base-url__ function](#can-utiljsbase-urlbase-url-function)</code>
    - <code>[baseUrl(optionalBaseUrlToSet)](#baseurloptionalbaseurltoset)</code>
  - <code>[__can-util/js/cid/cid__ function](#can-utiljscidcid-function)</code>
    - <code>[cid(object, optionalObjectType)](#cidobject-optionalobjecttype)</code>
  - <code>[__can-util/js/deep-assign/deep-assign__ function](#can-utiljsdeep-assigndeep-assign-function)</code>
    - <code>[deepAssign(target, [ ... sources ])](#deepassigntarget---sources-)</code>
  - <code>[__can-util/js/deparam/deparam__ function](#can-utiljsdeparamdeparam-function)</code>
    - <code>[deparam(params)](#deparamparams)</code>
  - <code>[__can-util/js/diff/diff__ function](#can-utiljsdiffdiff-function)</code>
    - <code>[diff(oldList, newList)](#diffoldlist-newlist)</code>
  - <code>[__can-util/js/diff-object/diff-object__ function](#can-utiljsdiff-objectdiff-object-function)</code>
    - <code>[diffObject(oldObject, newObject)](#diffobjectoldobject-newobject)</code>
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
  - <code>[__can-util/js/is-empty-object/is-empty-object__ function](#can-utiljsis-empty-objectis-empty-object-function)</code>
    - <code>[isEmptyObject(obj)](#isemptyobjectobj)</code>
  - _can-util/js/is-function/is-function_
  - <code>[__can-util/js/is-node/is-node__ function](#can-utiljsis-nodeis-node-function)</code>
    - <code>[isNode()](#isnode)</code>
  - <code>[__can-util/js/is-plain-object/is-plain-object__ function](#can-utiljsis-plain-objectis-plain-object-function)</code>
    - <code>[isPlainObject(obj)](#isplainobjectobj)</code>
  - <code>[__can-util/js/is-promise/is-promise__ function](#can-utiljsis-promiseis-promise-function)</code>
    - <code>[isPromise(obj)](#ispromiseobj)</code>
  - <code>[__can-util/js/is-string/is-string__ function](#can-utiljsis-stringis-string-function)</code>
    - <code>[isString(obj)](#isstringobj)</code>
  - <code>[__can-util/js/is-web-worker/is-web-worker__ function](#can-utiljsis-web-workeris-web-worker-function)</code>
    - <code>[isWebWorker()](#iswebworker)</code>
  - <code>[__can-util/js/join-uris/join-uris__ function](#can-utiljsjoin-urisjoin-uris-function)</code>
    - <code>[joinURIs(base, href)](#joinurisbase-href)</code>
  - <code>[__can-util/js/make-array/make-array__ function](#can-utiljsmake-arraymake-array-function)</code>
    - <code>[makeArray(arr)](#makearrayarr)</code>
  - <code>[__can-util/js/param/param__ function](#can-utiljsparamparam-function)</code>
    - <code>[param(params)](#paramparams)</code>
  - 
    - <code>[setImmediate(function())](#setimmediatefunction)</code>
  - <code>[__can-util/js/string/string__ Object](#can-utiljsstringstring-object)</code>
    - <code>[string.esc(content)](#stringesccontent)</code>
    - <code>[string.getObject(name, roots, add)](#stringgetobjectname-roots-add)</code>
    - <code>[string.capitalize(s)](#stringcapitalizes)</code>
    - <code>[string.camelize(s)](#stringcamelizes)</code>
    - <code>[string.hyphenate(s)](#stringhyphenates)</code>
    - <code>[string.underscore(s)](#stringunderscores)</code>
    - <code>[string.sub(str, data, remove)](#stringsubstr-data-remove)</code>
  - <code>[__can-util/js/string-to-any/string-to-any__ function](#can-utiljsstring-to-anystring-to-any-function)</code>
    - <code>[stringToAny(string)](#stringtoanystring)</code>

## API

## dom `{Object}`

A collection of modules that operate on DOM. 



### <code>Object</code>


### <code>__can-util/dom/ajax/ajax__ function</code>


#### <code>ajax(settings)</code>


1. __settings__ <code>{Object}</code>:
  Configuration options for the AJAX request.
  The list of configuration options is the same as for [jQuery.ajax](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings).

- __returns__ <code>{Promise}</code>:
  A Promise that resolves to the data.
  

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
  
### className `{Object}`

Allows querying and manipulation of classes on HTML elements 
```js
var className = require("can-util/dom/class-name/class-name");

var fooDiv = document.createElement("div");
className.add(fooDiv, "foo");
fooDiv.outerHTML; //-> '<div class="foo"></div>'
```




#### <code>Object</code>


#### <code>className.add.call(el, cls)</code>


Add a class name to a DOM node if it is not already there.

```js
className.add.call(el, "container");
```


1. __className__ <code>{String}</code>:
  A string representing a single class name token
  

- __returns__ <code>{void}</code>:
  
   

#### <code>className.has.call(el, cls)</code>


Determine wheter a DOM node has a given class name.

```js
var isContainer = className.has.call(el, "container");
```


1. __className__ <code>{String}</code>:
  A string representing a single class name token
  

- __returns__ <code>{Boolean}</code>:
  true if the element's class attribute contains the token, false otherwise.
   

#### <code>className.remove.call(el, cls)</code>


Remove a class name from a DOM node if it exists on the node

```js
className.remove.call(el, "container");
```


1. __className__ <code>{String}</code>:
  A string representing a single class name token
  

- __returns__ <code>{void}</code>:
  
   
### data `{Object}`

Allows associating data as a key/value pair for a particular DOM Node.

```js
var domData = require("can-util/dom/data/data");
```




#### <code>Object</code>


#### <code>domData.cid.call(el)</code>


- __returns__ <code>{Number}</code>:
  The value of the element's unique CID
  
  Set a unique identifier for the dom node, using the 
  undefined property.
  

#### <code>domData.clean.call(el, key)</code>


Remove data from an element previously added by [set](#domdatasetcallel-key-value)

```js
domData.clean.call(el, "metadata");
```
 

#### <code>domData.get.call(el, key)</code>


Get data that was stored in a DOM Node using the specified `key`.

```js
var metadata = domData.get.call(el, "metadata");
```


1. __key__ <code>{String}</code>:
  A string used as a unique key for storing data associated with this DOM Node.
   

#### <code>domData.getCid.call(el)</code>


- __returns__ <code>{Number}</code>:
  The value of the element's unique CID
  
  Return the previously set unique identifier for the dom node.
   

#### <code>domData.set.call(el, key, value)</code>



1. __name__ <code>{String}</code>:
  the key to store the value under
1. __value__ <code>{*}</code>:
  the value to store under the key
  
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
  

### <code>__can-util/dom/document/document__ function</code>


#### <code>document(document)</code>



1. __document__ <code>{Object}</code>:
  An optional document-like object 
  to set as the context's document
  
  Optionally sets, and returns, the document object for the context.
  
  ```js
  var documentShim = { getElementById() {...} };
  var domDocument = require("can-util/dom/data/data");
  domDocument(documentShim);
  
  ...
  
  domDocument().getElementById("foo");
  ```
  
### events `{Object}`

Allows you to listen to a domEvent and special domEvents. 
```js
var domEvents = require("can-util/dom/events/events");
```




#### <code>Object</code>

#### attributes `{events}`


Adds a listenable "attributes" event to DOM nodes, which fires when
the node's attributes change.



##### <code>events</code>

#### delegateEvents `{events}`


Add delegate listeners to DOM events.  Delegated listeners use a selector on an 
ancestor element to determine when to fire the event for an item.  This can help 
cases where large numbers of similar DOM nodes are added into a DOM subtree, since
event handlers do not have to be attached to each new node.



##### <code>events</code>

#### inserted `{events}`

 
This event fires when nodes are added as descendants of the attached element



##### <code>events</code>


#### <code>__can-util/dom/events/make-mutation-event/make-mutation-event__ function</code>



##### <code>makeMutationEvent(specialEventNae, mutationNodesProperty)</code>



1. __specialEventName__ <code>{String}</code>:
  the event to handle as a mutation observer-based event
1. __mutationNodesProperty__ <code>{String}</code>:
  the property of interest in a DOM mutation
  
  This function provides a simple interface to bind the DOM events interface to the mutation
  observer interface, by firing an event when a matching mutation is generated by the client
  
#### removed `{events}`

 
This event fires when descendant elements of the bound element are detached
or destroyed.



##### <code>events</code>


### <code>__can-util/dom/frag/frag__ function</code>

Convert a String, HTMLElement, documentFragment, or contentArray into a documentFragment.


#### <code>frag: function(item, doc)</code>



1. __item__ <code>{String|HTMLElement|documentFragment|contentArray}</code>:
  
1. __doc__ <code>{Document}</code>:
  an optional DOM document in which to build the fragment
  

- __returns__ <code>{documentFragment}</code>:
  
  
### mutate `{Object}`

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

Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `mutated` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
 

#### <code>mutate.insertBefore.call(el, ref, child)</code>

Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
 

#### <code>mutate.removeChild.call(el, child)</code>

Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
 

#### <code>mutate.replaceChild.call(el, child)</code>

Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
 
## js `{Object}`

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
  

### <code>__can-util/js/base-url/base-url__ function</code>


#### <code>baseUrl(optionalBaseUrlToSet)</code>


Get and/or set the "base" (containing path) of the document.

```js
var baseUrl = require("can-util/js/base-url/base-url");

console.log(baseUrl());           // -> "http://localhost:8080"
console.log(baseUrl(baseUrl() + "/foo/bar")); // -> "http://localhost:8080/foo/bar"
console.log(baseUrl());           // -> "http://localhost:8080/foo/bar"
```


1. __setUrl__ <code>{String}</code>:
  An optional base url to override reading the base URL from the known path.
  

- __returns__ <code>{String}</code>:
  Returns the set or computed base URL
  

### <code>__can-util/js/cid/cid__ function</code>


#### <code>cid(object, optionalObjectType)</code>


Get a unique identifier for the object, optionally prefixed by a type name.

Once set, the unique identifier does not change, even if the type name
changes on subsequent calls.

```js
var cid = require("can-util/js/cid/cid");
var x = {};
var y = {};

console.log(cid(x, "demo")); // -> "demo1"
console.log(cid(x, "prod")); // -> "demo1"
console.log(cid(y));         // -> "2"
```


1. __object__ <code>{Object}</code>:
  The object to uniquely identify.
1. __name__ <code>{String}</code>:
  An optional type name with which to prefix the identifier 
  

- __returns__ <code>{String}</code>:
  Returns the unique identifier
  

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
  

### <code>__can-util/js/deparam/deparam__ function</code>


#### <code>deparam(params)</code>



1. __params__ <code>{String}</code>:
  a form-urlencoded string of key-value pairs

- __returns__ <code>{Object}</code>:
  The params formatted into an object
  
  Takes a string of name value pairs and returns a Object literal that represents those params.
  
  ```js
  var deparam = require("can-util/js/deparam/deparam");
  
  console.log(JSON.stringify(deparam("?foo=bar&number=1234"))); // -> '{"foo" : "bar", "number": 1234}'
  console.log(JSON.stringify(deparam("#foo[]=bar&foo[]=baz"))); // -> '{"foo" : ["bar", "baz"]}'
  console.log(JSON.stringify(deparam("foo=bar%20%26%20baz"))); // -> '{"foo" : "bar & baz"}'
  ```
  

### <code>__can-util/js/diff/diff__ function</code>


#### <code>diff(oldList, newList)</code>



1. __oldList__ <code>{ArrayLike}</code>:
  the array to diff from
1. __newList__ <code>{ArrayLike}</code>:
  the array to diff to

- __returns__ <code>{Array}</code>:
  a list of Patch objects representing the differences
  
  Returns the difference between two ArrayLike objects (that have nonnegative
  integer keys and the `length` property) as an array of patch objects.
  
  A patch object returned by this function has the following properties:
  - **index**:  the index of newList where the patch begins
  - **deleteCount**: the number of items deleted from that index in newList
  - **insert**: an Array of items newly inserted at that index in newList
  
  ```js
  var diff = require("can-util/js/diff/diff");
  
  console.log(diff([1], [1, 2])); // -> [{index: 1, deleteCount: 0, insert: [2]}]
  console.log(diff([1, 2], [1])); // -> [{index: 1, deleteCount: 1, insert: []}]
  ```
  

### <code>__can-util/js/diff-object/diff-object__ function</code>


#### <code>diffObject(oldObject, newObject)</code>



1. __oldObject__ <code>{Object}</code>:
  the object to diff from
1. __newObject__ <code>{Object}</code>:
  the object to diff to

- __returns__ <code>{Array}</code>:
  an array of object-patch objects
  
  Find the differences between two objects, based on properties and values
  
  The object-patch object format has the following keys:
  - **property**: the property key on the new object
  - **type**:     the type of operation on this property: add, remove, or set
  - **value**:    the new value (if type is "add" or "set")
  
  ```js
  var diffObject = require("can-util/js/diff-object/diff-object");
  
  console.log(diffObject({a: 1, b: 2}, {b: 3, c: 4})); // ->
    [{property: "a", type: "remove"},
     {property: "b", type: "set": value: 3},
     {property: "c", type: "add", "value": 4}]
  ```
  

### <code>__can-util/js/each/each__ function</code>



#### <code>each(elements, callback, context)</code>


Loop over each element in an Array-Like data structure.


1. __elements__ <code>{Object|ArrayLike}</code>:
  
1. __callback__ <code>{function(element, key, elements)}</code>:
  
1. __context__ <code>{Object}</code>:
  the context object
  

- __returns__ <code>{ArrayLike}</code>:
  the orignal array of elements
  
  ```js
   var each = require("can-util/js/each/each");
   
   each([2,1,0], function(i) { console.log(this[i]); }, [4,5,6]); // -> 6 \n 5 \n 4
  ```
  

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
  

### <code>__can-util/js/is-empty-object/is-empty-object__ function</code>


#### <code>isEmptyObject(obj)</code>


Used to determine if an object is an empty object (an object with no enumerable properties) such as `{}`.

```js
var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");

console.log(isEmptyObject({})); // -> true

console.log(isEmptyObject({ a: 1 })); // -> false

var obj = {};
Object.defineProperty(obj, "foo", {
    enumerable: false,
    value: "bar"
});
console.log(isEmptyObject(obj)); // -> true
```


1. __obj__ <code>{Object}</code>:
  Any object.

- __returns__ <code>{Boolean}</code>:
  True if the object is an object with no enumerable properties.
  

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
  

### <code>__can-util/js/make-array/make-array__ function</code>


#### <code>makeArray(arr)</code>


1. __arr__ <code>{ArrayLike}</code>:
  any array-like object

- __returns__ <code>{Array}</code>:
  a JavaScript array object with the same elements as the passed-in ArrayLike
  
  makeArray takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array
  

### <code>__can-util/js/param/param__ function</code>

Serialize an object into a query string.


#### <code>param(params)</code>


  Serializes an object or array into a query string useful for making Ajax requests or the
  browser. `param` handles nested objects and arrays.  It uses `encodeURIComponent` to
  escape values and keys.

  ```js
  param({a: "b", c: "d"}) //-> "a=b&c=d"
  param({a: ["X","Y"]})   //-> "a[]=X&a[]=Y"
  ```


1. __params__ <code>{Object}</code>:
  [description]

- __returns__ <code>{String}</code>:
  [description]
  

### <code>__can-util/js/set-immediate/set-immediate__ module</code>


#### <code>setImmediate(function())</code>


1. __cb__ <code>{function}</code>:
  
  
  Polyfill for setImmediate() if it doesn't exist in the global context
  
### string `{Object}`

String utilities used by CanJS libraries 



#### <code>Object</code>


#### <code>string.esc(content)</code>


1. __content__ <code>{String}</code>:
  a string

- __returns__ <code>{String}</code>:
  the string safely HTML-escaped
   

#### <code>string.getObject(name, roots, add)</code>


1. __name__ <code>{String}</code>:
  a String of dot-separated keys, representing a path of properties
1. __roots__ <code>{Object|Array}</code>:
  the object to use as the root for property based navigation
1. __add__ <code>{Boolean}</code>:
  if true, add the parts at each step as new objects

- __returns__ <code>{*}</code>:
  the value at the property path descending from `roots`
  
  Return the result of descending the path `name` through the properties of the object or objects
  `roots`
  
  If `roots` is an Array, each element of the array is evaluated, in order, until
  the path is found in an element's properties (and properties-of-properties, etc.).  Otherwise
  `roots` is evaluated as the root object, returning either the object at the property path
  descended from `roots` or `undefined` if any subpath is not found.
  
  A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
  'bar' of the object at the property 'foo' of the root."  An empty path returns the first object in `roots`
  if it's an array, `roots` itself otherwise.
  
  If `add` is `true` and `path` is not found in any roots, a matching path that resolves to an empty object
  is added to the first object in `roots` if `roots` is an array, `roots` itself otherwise.
  
  ```js
  var string = require("can-util/js/string/string");
  console.log(string.getObject("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
  console.log(string.getObject("a.b.c", {a: {}})); // -> undefined
  console.log(string.getObject("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
  ```
   

#### <code>string.capitalize(s)</code>


1. __s__ <code>{String}</code>:
  the string to capitalize

- __returns__ <code>{String}</code>:
  the supplied string with the first character uppercased if it is a letter
  
  ```js
  var string = require("can-util/js/string/string");
  
  console.log(string.capitalize("foo")); // -> "Foo"
  console.log(string.capitalize("123")); // -> "123"
  ```
   

#### <code>string.camelize(s)</code>


1. __str__ <code>{String}</code>:
  the string to camelCase

- __returns__ <code>{String}</code>:
  the supplied string with hyphens removed and following letters capitalized.
  
  ```js
  var string = require("can-util/js/string/string");
  
  console.log(string.camelize("foo-bar")); // -> "fooBar"
  console.log(string.camelize("-webkit-flex-flow")); // -> "WebkitFlexFlow"
  ```
   

#### <code>string.hyphenate(s)</code>


1. __str__ <code>{String}</code>:
  a string in camelCase

- __returns__ <code>{String}</code>:
  the supplied string with camelCase converted to hyphen-lowercase digraphs
  
  ```js
  var string = require("can-util/js/string/string");
  
  console.log(string.hyphenate("fooBar")); // -> "foo-bar"
  console.log(string.hyphenate("WebkitFlexFlow")); // -> "Webkit-flex-flow"
  ```
   

#### <code>string.underscore(s)</code>


1. __str__ <code>{String}</code>:
  a string in camelCase

- __returns__ <code>{String}</code>:
  the supplied string with camelCase converted to underscore-lowercase digraphs
  
  ```js
  var string = require("can-util/js/string/string");
  
  console.log(string.underscore("fooBar")); // -> "foo_bar"
  console.log(string.underscore("HTMLElement")); // -> "html_element"
  ```
   

#### <code>string.sub(str, data, remove)</code>


1. __str__ <code>{String}</code>:
  a string with {curly brace} delimited property names
1. __data__ <code>{Object}</code>:
  an object from which to read properties

- __returns__ <code>{String|null}</code>:
  the supplied string with delimited properties replaced with their values
                        if all properties exist on the object, null otherwise
  
  If `remove` is true, the properties found in delimiters in `str` are removed from `data`.
  
  ```js
  var string = require("can-util/js/string/string");
  
  console.log(string.sub("foo_{bar}", {bar: "baz"}})); // -> "foo_baz"
  console.log(string.sub("foo_{bar}", {})); // -> null
  ```
   

### <code>__can-util/js/string-to-any/string-to-any__ function</code>
Turns a string representation of a primitive type back into the associated primitive. 


#### <code>stringToAny(string)</code>


Examines the provided string to see if it can be converted to a primitive type. Supported arguments are:

* "true"
* "false"
* "null"
* "undefined"
* "NaN"
* "Infinity"
* Any [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* Any [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

```js
stringToAny("NaN"); // -> NaN
stringToAny("44.4"); // -> 44.4
stringToAny("false"); // -> false
```


1. __string__ <code>{String}</code>:
  A string to convert back to its primitive type.
  

- __returns__ <code>{*}</code>:
  The primitive representation of the provided string.
         
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
