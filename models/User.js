var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true},
    userAddress: String,
    contractAddress: String,
    identityNumber: String,
    email: String,
    protectee: [{ type: mongoose.Types.ObjectId, ref: 'Guard' }],
    guards: [{ type: mongoose.Types.ObjectId, ref: 'Guard' }],
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
      id: this._id,
      walletAddress: this.walletAddress,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

  UserSchema.methods.toAuthJSON = function(){
    return {
      userAddress: this.userAddress,
      walletAddress: this.walletAddress,
      identityNumber: this.identityNumber,
      email: this.email,
      guards: this.guards
    };
  };

  UserSchema.methods.addGuard = function(address){
    if(this.guards.indexOf(address) === -1){
      this.guards.push(address);
    }
    return this.save();
  }

  UserSchema.methods.addProtectee = function(address){
    if(this.guards.indexOf(address) === -1){
      this.guards.push(address);
    }
    return this.save();
  }

mongoose.model('User', UserSchema);
