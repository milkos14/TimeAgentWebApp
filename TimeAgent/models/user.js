const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
 
const User = new Schema({
	username: String,
	password: String
});
 
User.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User', User);