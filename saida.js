(function(){var User=Backbone.Model.extend({"idAttribute":"id","urlRoot":"/data/User","defaults":{}});var UserCollection=Backbone.Collection.extend({model:User,url:'/data/User'});if(typeof module!=='undefined'&&module.exports){module.exports={model:User,collection:UserCollection};}
else if(typeof window.define==='function'&&window.define.amd){define(function(){return{model:User,collection:UserCollection};});}
else{window.User=User;window.UserCollection=UserCollection;}}());
