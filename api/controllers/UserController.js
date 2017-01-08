/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res){
		if(!req.body || !req.body.name || !req.body.password)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		User.login(req.body, function(err, UserData) {
			if(err)
				return res.negotiate(err);
			
			res.send(UserData);
		});
	},

	add: function (req, res) {
		if(!req.body || !req.body.name || !req.body.password|| !req.body.phone || !req.body.email)
			return res.negotiate({message: "parameter(s) is missing", status: 400});
		
		User.add(req.body, function(err, userOnj) {
			if(err)
				return res.negotiate(err);
			
			res.send({message: "User added succesfully", status: 200});
		});	
	},

	hello : function(req, res) {
		sails.log('in UserController hello', sails.sockets.getId(req));
		sails.log('in UserController user', req.param("user"));
		if(req.isSocket){
			User.get(req.param("user"), function(err, userObj){
				if(err)
					return res.negotiate(err);
				
				var data = {
					data: "Hi "+userObj.name+", we will notify you if any changes in plan"
				};
				subscribeToFunRoom(req);

				res.send(data);
			});
		}else{
			res.negotiate({message: "isSocket false", status: 400});
		}

	},

	sayHiToAll: function(req, res){
		var data = {
			data: "Hi, Welcome all"
		};
		sails.sockets.blast("user", data);
	},

	sendMessageToRoom: function(req, res){
		if(!req.body || !req.body.roomName || !req.body.data)
			return res.negotiate({message: "parameter(s) is missing", status: 400});

		var roomName = req.body.roomName;
		var data = {
			data: req.body.data
		};
		User.sendMessageToRoom(roomName, data, function(err, resData){
			if(err)
				return res.negotiate(err);
			
			res.send(resData);
		});	
	}
};

function subscribeToFunRoom(req, res) {
		if (!req.isSocket) {
			return res.badRequest();
		}

		Subscription.getSubscribedPlans(req.param("user"), function(err, subsArr){
			if(err){
				sails.log("getSubscribedPlans err", err);
				return false;
			}
			if(subsArr.length > 0){
				_.each(subsArr, function(item, idx){
					sails.sockets.join(req, item.plan, function(err) {
						if (err) {
							return res.serverError(err);
						}
						sails.log("Subscribed to a room: "+item.plan+" room called");
					});
				});
			}
		});
		// var roomName = "Fun";
		// sails.sockets.join(req, roomName, function(err) {
		// 	if (err) {
		// 		return res.serverError(err);
		// 	}
		// 	sails.log("Subscribed to a fun room called");
		// });
	}
