/**
 * PlanController
 *
 * @description :: Server-side logic for managing plans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function (req, res) {
		sails.log("add", req.body);
		if(!req.body || !req.body.name || !req.body.price)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		Plan.add(req.body, function(err, planObj) {
			if(err)
				return res.negotiate(err);
			
			res.send({message: "Plan added succesfully", status: 200});
		});	
	},

	edit: function (req, res) {
		if(!req.body || !req.body.name || !req.body.price || !req.body.id)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		Plan.edit(req.body, function(err, planObj) {
			if(err)
				return res.negotiate(err);
			
			res.send({message: "Plan updated succesfully", status: 200});
		});	
	},

	getAll: function(req, res){
		Plan.getAll(function(err, planArr){
			if(err)
				return res.negotiate(err);
			
			res.view('admindashboard', {data: planArr});
		});
	}
};

