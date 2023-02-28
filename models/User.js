var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    walletAddress: String,
    firstName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    lastName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    phoneNumber: {type: String, lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid']},
    image: String,
    identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity' },
    guards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guard' }],
    created: { 
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});

  UserSchema.methods.addGuard = function(address){
    if(this.guards.indexOf(address) === -1){
      this.guards.push(address);
    }
    return this.save();
  }

  UserSchema.methods.removeGuard = function(address){
    this.guards.remove(address);
    return this.save();
  }

  UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      walletAddress: this.walletAddress,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

  UserSchema.methods.toAuthJSON = function(){
    return {
      walletAddress: this.walletAddress,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      token: this.generateJWT(),
      phoneNumber: this.phoneNumber,
      image: this.image
    };
  };

mongoose.model('User', UserSchema);
