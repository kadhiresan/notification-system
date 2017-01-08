/**
 * Subscription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		user: {
	      	model: 'User'
	    },
	    plan: {
	      	model: 'Plan'
	    }
  	},

  	//get plans and subscriptions
  	get: function(opts, cb) {
  		var locals = {};
  		async.parallel([
            function(callback) {
	        	Plan.find({}, function(err, planArr){
	  				if (err) return callback(err);

	  				locals.plans = planArr;
	  				callback();
	  			});
            },
            function(callback) {
            	Subscription.find({user: opts.userId}, function(err, subsArr){
	  				if (err) return callback(err);

	  				locals.subscriptions = subsArr;
	  				callback();
	  			});
            }
       ], function(err) {
	        if (err) 
	        	return cb(err);

	        // sails.log("locals =", locals);
	        if(locals.subscriptions && locals.subscriptions.length > 0){
	        	var userSubsId = _.pluck(locals.subscriptions, 'plan')
	        	_.each(locals.plans, function(item, idx){
	        		locals.plans[idx]['userId'] = opts.userId;
	        		if(userSubsId.indexOf(item.id) == -1){
	        			locals.plans[idx]['subscriptionStatus'] = false;
	        		}else{
	        			locals.plans[idx]['subscriptionStatus'] = true;
	        		}
	        	});
	        	cb(null, locals.plans);
	        }else{
	        	_.each(locals.plans, function(item, idx){
	        		locals.plans[idx]['userId'] = opts.userId;
	        		locals.plans[idx]['subscriptionStatus'] = false;
	        	});
	        	cb(null, locals.plans);
	        }
	    });
  	},

  	getSubscribedPlans(userId, cb){
  		Subscription.find({user: userId}, function(err, subsArr){
  			cb(err, subsArr);
  		});
  	},

  	add: function(opts, cb){
  		Subscription.create(opts, function(err, subsObj){
			cb(err, subsObj);
		});
  	},

  	addEdit: function(opts, cb){
  		var input = {
  			user : opts.userId,
  			plan : opts.plan
  		};
  		if(opts.action == 'checked'){
  			Subscription.findOne({user: opts.userId, plan: opts.plan}, function(err, subsObj){
				if (err) 
		        	return cb(err);

		        if(!subsObj){
		        	Subscription.add(input, function(err, resData){
		        		cb(err, resData);
		        	});
		        }
			});
  		}else if(opts.action == 'un_checked'){
  			Subscription.destroy(input, function(err, resData){
  				cb(err, resData);
  			});
  		}else{
  			cb({message: "Action not found", status: 400});
  		}
  	}
};

