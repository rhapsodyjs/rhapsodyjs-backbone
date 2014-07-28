var jsmin = require('jsmin').jsmin,
	path = require('path'),
	_ = require('lodash'),
	fs = require('fs');

var BackboneAdapter = function BackboneAdapter(options) {
	this.urlRoot = options.urlRoot;
};

BackboneAdapter.prototype = {
	generate: function generate(modelName, requiredModel) {
		var urlRoot = this.urlRoot + modelName;

		var clientDefaults = {},
			modelAttributes = requiredModel.attributes;

		for(var attr in modelAttributes) {
			if(typeof modelAttributes[attr].default !== 'undefined') {
				clientDefaults[attr] = modelAttributes[attr].default;
			}
		}

		//Possible fields of a Backbone.Model
		var clientModel = {
		  idAttribute: 'id',
		  urlRoot: urlRoot,
		  defaults: clientDefaults
		};

		//Stringify all the model data, but not the methods, and remove the closing '}' that
		//will be included after the methods be concatenated
		//We do it because JSON.stringify ignores the functions
		var modelData = JSON.stringify(clientModel);
		modelData = modelData.substring(0, modelData.length - 1) + ', ';

		//Merge shared methods first, so it can be overwriten by specific client methods
		var modelMethods = requiredModel.sharedMethods;
		modelMethods = _.merge(modelMethods, requiredModel.clientMethods);

		_.forIn(modelMethods, function(method, methodName) {
		  modelData += '\"' + methodName + '\": ' + method.toString() + ',\n';
		});

		//Remove the last comma and '\n' then closes the '}'
		modelData = modelData.substring(0, modelData.length - 2) + '}';

		//Lodash template for Backbone.Model
		var backboneModelTemplate = _.template(fs.readFileSync(path.join(__dirname, 'template.js')));

		//Create the Backbone.Model file content
		var backboneModelString = backboneModelTemplate({
		  name: modelName,
		  modelData: modelData
		});

		//Minifies the file content
		backboneModelString = jsmin(backboneModelString);

		return backboneModelString;

	}
};

module.exports = BackboneAdapter;