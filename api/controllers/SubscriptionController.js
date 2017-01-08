/**
 * SubscriptionController
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res) {
		if(!req.param("user")){
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		}

		var opts = {
			userId: req.param("user")
		};

		Subscription.get(opts, function(err, data){
			return res.view('dashboard', {data: data});
		});
	},

	add: function (req, res) {
		if(!req.body || !req.body.user || !req.body.plan)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		Subscription.add(req.body, function(err, subsObj) {
			if(err)
				return res.negotiate(err);
			
			res.send({message: "Subscription added succesfully", status: 200});
		});	
	},

	addEdit: function (req, res) {
		sails.log("SubscriptionController addEdit", req.body);
		if(!req.body || !req.body.plan)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		Subscription.addEdit(req.body, function(err, subsObj) {
			if(err)
				return res.negotiate(err);
			
			sails.log("subsObj =", subsObj);
			res.send({message: "success", status: 200});
		});	
	},
};

