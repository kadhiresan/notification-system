/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		name: {
	      	type: 'string',
	      	required: true
	    },
	    price: {
	      	type: 'integer',
	      	required: true
	    }
  	},

  	get: function(planId, cb) {
  		var planId = ''+planId+'';
  		Plan.find({id: planId}, function(err, planObj){
			cb(err, planObj[0]);
		});
  	},

  	getAll: function(cb) {
  		Plan.find({}, function(err, planArr){
			cb(err, planArr);
		});
  	},
  	
  	add: function(data, cb) {
  		Plan.create(data, function(err, planObj){
			cb(err, planObj);
		});
  	},

  	edit: function(body, cb) {
  		Plan.update({id: body.id}, body, function(err, planObj){
			cb(err, planObj);
		});
  	},
};

