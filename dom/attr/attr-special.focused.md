@property {Boolean} can-util/dom/attr/attr.special.focused focused
@parent can-util/dom/attr/attr.special

Signifies if an element, usually an `<input>` is the focused element on the page.

```js
domAttr.get( input, "focused" ); // -> false

domAttr.set( input, "focused", true );
domAttr.get( input, "focused" ); // -> true
```

@body

## One-way binding to set focus

Use `focused` in event bindings to have a way to set focus to an input. In this example we are one-way binding to `focused` to a function that will recompute:

```handlebars
<input type="text" focused:from="isEditing()" />

<button></button>
```

```js
const ViewModel = DefineMap.extend( {
	editing: {
		value: false
	},
	isEditing: function() {
		return this.editing;
	}
} );

// ...
```

In this example whenever the `editing` property changes to `true`, `isEditing` will be reevaluated to `true` when will set focus on the input. You can imagine there might be some other use, such as a button, that triggers the editing status to change.

## Two-way binding to focused

Another scenario is that you would like to know when an element is focused, perhaps to show a message (such as a tooltip) somewhere else in the DOM. The example below two-way binds to a boolean property on the ViewModel. When focus is set, the property is updated.

@demo demos/can-util/input-focused.html
