/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
  		name: {
	      	type: 'string',
	      	required: true,
	      	unique: true
	    },
	    password: {
	      	type: 'string',
	      	required: true
	    },
	    email: {
	      	type: 'string',
	      	required: true,
	      	unique: true
	    },
	    phone: {
	      	type: 'string',
	      	required: true,
	      	unique: true
	    },
	    role: {
	    	type: 'string',
	    	defaultsTo: "user"
	    }
  	},

  	get: function(id, cb) {
  		User.findOne({id: id}, function(err, userObj){
			cb(err, userObj);
		});
  	},

  	login: function(data, cb) {
  		User.findOne({name: data.name, password: data.password}, function(err, userObj){
			if(err)
				return cb(err);

			if(!userObj)
				return cb({message: "Invalid account credentials", status: 400});

			cb(err, userObj);
		});
  	},

  	add: function(data, cb) {
  		User.create(data, function(err, userObj){
			cb(err, userObj);
		});
  	},

  	sendMessageToRoom(roomName, data, cb){
  		sails.sockets.broadcast(roomName, "user", data);
  		
  		cb(null, {message: "Send to room", status:200});
  	},

  	sendMessageToAll(data, cb){
  		sails.sockets.blast("user", data);

  		cb(null, {message: "Send to all", status:200});
  	}
};

