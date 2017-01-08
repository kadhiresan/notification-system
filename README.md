# notification-system : GossipGirl App
=====================
Gossip Girl - notification system to notify subscribers of changes made in a mongodb database in  real-time

A [Sails](http://sailsjs.org) [NodeJs](https://nodejs.org/en/) application

## Installation
i am assuming you already installed node js, sails js, mongodb and npm in your system

1. Clone the repo

  ```bash
    git clone https://github.com/kadhiresan/notification-system.git
  ```

2. Move to project folder
  ```bash
	cd notification-system
  ```

3. install all dependencies
  ```bash
  npm install
  ```

4. Run the project
  ```bash
  sails lift



## MongoDB setup

1. Start MongoDB with:

  ```bash
    mongod --replSet GossipGirl
  ```

2. Start a mongo shell and configure mongo as follows:
  ```bash
	var config = {_id: "test", members: [{_id: 0, host: "127.0.0.1:27017"}]}
	rs.initiate(config)
  ```

3. Once configuration is initiated then you can run the test

**Notes**

	By default it will create admin account

	Admin user name: admin and password: admin123

	Login with admin credential and create/edit the plan (channels)

	Signup/Login with user and subscribe the channel so that will get notification - if admin change anything

**Improvements**

	1. User session management and jwt implementation
	2. UI improvements
	3. Need to add more functionality ... :)

**Admin Home**
![alt tag](https://github.com/kadhiresan/notification-system/blob/master/assets/images/admin_home_page.png)

**User Home**
![alt tag](https://github.com/kadhiresan/notification-system/blob/master/assets/images/user_home_page.png)

### Contributions

You are feel free to contribute for improvements. 
PR's are most welcome ;)	
