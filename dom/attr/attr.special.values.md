@property {Boolean} can-util/dom/attr/attr.special.values values
@parent can-util/dom/attr/attr.special

A special property that represents the selected values in a `<select>` element, usually a `<select multiple>`. The special property is needed because the DOM's native `value` property on a multiple select only gives you one of the selected options' values.

@body

Binding to `values` in your [can-stache] template is useful to get a list of the selected values:

```handlebars
<select multiple values:bind="colors">
	<option value="red">Red</option>
	<option value="green">Green</option>
	<option value="blue">Blue</option>
</select>
```

This will two-way bind to a "colors" property in the ViewModel.
