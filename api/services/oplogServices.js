// import MongoOplog from 'mongo-oplog'
var MongoOplog = require('mongo-oplog');
const oplog = MongoOplog('mongodb://127.0.0.1:27017/local', { ns: 'GossipGirl.plan' })
 
oplog.tail();
 
// oplog.on('op', data => {
//   console.log("op =", data);
// });
 
oplog.on('insert', doc => {
  	console.log("insert =", doc);
	var data = {
		data: "Admin craeted new plan called "+doc.o['name']+" and its price is "+doc.o['price']
	};
	User.sendMessageToAll(data, function(err, data){
		sails.log("insert =", err, data);
	});
});
 
oplog.on('update', doc => {
	console.log("update =", doc);
	var roomName = doc.o2._id;
	Plan.get(roomName, function(err, planObj){
		var changesIn = Object.keys(doc.o['$set']);
		sails.log("planObj", planObj);
		var data = {
			data: "Changes in "+planObj.name+" plan "+changesIn.toString().replace(",updatedAt", "")
		};
		User.sendMessageToRoom(roomName, data, function(err, data){
			sails.log("update =", err, data);
		});
	});
});
 
oplog.on('delete', doc => {
	// console.log("delete =", doc.o._id);
	var roomName = doc.o2._id;
	var changesIn = Object.keys(doc.o['$set']);
	var data = {
		data: "Admin deleted the "+doc.o['$set'].name+" plan"
	};
	User.sendMessageToRoom(roomName, data, function(err, data){
		sails.log("delete =", err, data);
	});
});
 
oplog.on('error', error => {
  	console.log("error =", error);
});
 
// oplog.on('end', () => {
//   console.log('Stream ended');
// });
 
// oplog.stop(() => {
//   console.log('server stopped');
// });