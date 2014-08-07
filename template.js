(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['backbone'], function (Backbone) {
            return factory(Backbone);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('backbone'));
    } else {
        var model = factory(root.Backbone);
        root.<%= name %> = model.model;
        root.<%= name %>Collection = model.collection;
    }
}(this, function (Backbone) {
    
    var model = Backbone.Model.extend(<%= modelData %>);

    var collection = Backbone.Collection.extend({
        model: model,
        url: '/data/<%= name %>'
    });

    return {
        model: model,
        collection: collection
    };

}));