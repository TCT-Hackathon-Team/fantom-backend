var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Guard = mongoose.model('Guard');
var auth = require('../auth');


router.get('/user/guard', auth.required, function(req, res, next){

    Guard.find({walletAddress: req.body.walletAddress}).then(function(guards){
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });


  module.exports = router;