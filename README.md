# labelSelect

labelSelect is a tiny plugin for jQuery that creates an HTML label selector. What is a label selector, you may ask? It is a control element with a behavior similar to the select HTML tag, displaying a set of custom options. When one of these options is selected, the control transforms itself into a regular label. The control element appears again when clicking on the label.

This plugin was developed to be used in a HTML form maker.


## Getting started 🚀

Follow these instructions to use labelSelect on your project.


### Pre-requisites 📋

Make sure you have installed all of the following prerequisites on your development and production machines:

* jQuery - [Download jQuery](https://jquery.com/download/). Of course, being a jQuery plugin, labelSelect needs jQuery to work.
* cubiq's iScroll - [Download iScroll](https://github.com/cubiq/iscroll). labelSelect requires the iScroll javascript scroller.

### Installation 🔧

Include labelSelect's .js and .css files on your page:

```html
<link rel="stylesheet" type="text/css" href="labelselect.css">
<script src="labelselect.js"></script>
```

You can also use the minified version of labelSelect:

```html
<link rel="stylesheet" type="text/css" href="labelselect.min.css">
<script src="labelselect.min.js"></script>
```


### Initialization 📦

The labelSelect needs to be initiated when the target DOM element is ready. The safest bet is to start it on window `onload` event or jQuery's document.ready, but it can also be launched on a script tag positioned below the element.

To sum up, the smallest labelSelect configuration is:

```html
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="labelSelect.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script type="text/javascript" src="iscroll.js"></script>
    <script src="labelSelect.js"></script>
</head>
<body>
	<label id="myLabel"></label><br/>
	<script>
		$('#myLabel').labelSelect({
			values:         [
				{id: 'one', label: 'One'},
				{id: 'two', label: 'Two'},
				{id: 'three', label: 'Three'}
			]
		});
	</script>
</body>
```


## Configuring the labelSelect ⚙️

labelSelect can be configured by passing an object of option - value pairs during the initialization phase.

```js
$('#myLabel').labelSelect({
	unfoldDir: 'down',
	values:         [
		{id: 'one', label: 'One'},
		{id: 'two', label: 'Two'},
		{id: 'three', label: 'Three'}
	],
	width: '100px'
});
```

Settings can also be changed or first set by passing the option key and the value as two parameters.

```js
$('#myLabel').labelSelect('width', '100px');
```


## Docs 📖

In this section you can read about the options, events and methods of this plugin.

### Options

#### **options.replacedLabelOnSelect**

By default labelSelect changes to a regular HTML label once the user select one of the non-none options. 

Default: `true`

#### **options.extraClass**

Additional classes for the labelSelect element.

Default: `none`

#### **options.for**

By default labelSelect's labels do not have any for attribute. This option changes this by assigning the desired id to it.

Default: `none`

#### **options.highlightSel**

By default labelSelect highlights the currently selected option. This options allows to disable this behavior.

Default: `true`

#### **options.theme**

There are two themes included in labelSelect: *white* and *black*. White is the default theme. It is also possible to add custom themes to labelSelect. To do this, just add your custom css sheet. An example on how to create the black theme is:

```css
.labelSelect.theme_black {
    border: #909090 solid 1px;
    background-color: #000000;
}

.labelSelect.theme_black * {
    color: #b0b0b0;
}

.labelSelect.theme_black.highlight-selection > ul > li.selected,
.labelSelect.theme_black.highlight-selection > ul > li:hover {
    background-color: rgba(255, 255, 255, 0.18);;
}
```

Default: `white`

#### **options.unfoldDir**

By default labelSelect unfolds its options down. However, by setting unfoldDir to 'up', it is possible to unfold the contents on top of the label.

Default: `down`

#### **options.values**

The values of the labelSelect are the label options that are displayed on the control element. These options need to be passed as objects with two key-value pairs: id and label.

#### **options.width**

This option allows the user to control the width of the labelSelect. By default, the width is automatically calculated.

Default: `auto`


### Custom events

labelSelect emits some custom events you can hook to.

To register them you use the `on(type, fn)` method.

```js
var myLabel = $('#myLabel').labelSelect({...});

myLabel.on('refreshed', doSomething);
```

The available events are:

* **change**, is triggered when the selection changes.
* **folded**, executed as soon as the select control is folded back.
* **refreshed**, triggered when the select control appears (or re-appears).
* **replacedLabel**, executed when the select control is replaced by the label.
* **selectNone**, executed when the 'none' option is selected in the control.
* **selectOption**, executed when any different than 'none' option is selected in the control.
* **unfolded**, executed as soon as the select control is unfolded.


### Methods

#### **getSelected()**

Gets the id of the currently selected option.

* This method does not accept any arguments.

Returns: `string`

Code examples:

```js
var sel = $('#myLabel').labelSelect('getSelected');
```

#### **refresh()**

Forces the select control to appear (or re-appear).

* This method does not accept any arguments.

Returns: `jQuery`

Code examples:

```js
$('#myLabel').labelSelect('refresh');
```

#### **replaceLabel()**

Replaces the select control with the currently-selected option's text.

* This method does not accept any arguments.

Returns: `jQuery`

Code examples:

```js
$('#myLabel').labelSelect('replaceLabel');
```

#### **setSelected(id)**

Sets the selected option from its id.

* **id** (String) The name of the option to get.

Returns: `jQuery`

Code examples:

```js
$('#myLabel').labelSelect('setSelected', 'first');
```

## License (MIT) 📄

Copyright (c) 2016 Borja García Quiroga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
