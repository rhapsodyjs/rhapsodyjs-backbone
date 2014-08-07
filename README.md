# RhapsodyJS Backbone adapter

Generate BackboneJS models from RhapsodyJS models

```sh
	$ npm install rhapsodyjs-backbone
```

The generated model uses the [UMD pattern](https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js),
so it will work if you're using globals (with `<script>`), RequireJS or Browserify/CommonJS.

## Globals

The model will be accessible via the variable `Model`, and the collection will be acessible by the variable `ModelCollection`,
where Model is the name of your model.

## RequireJS and Browserify/CommonJS

The module object will be the following two attributes, `model` and `collection`.

Let's say that the module object is called `Model`: 

```js
	Model.model; //Gets the model
	Model.collection; //Gets the collection
```