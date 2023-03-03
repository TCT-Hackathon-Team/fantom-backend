//CRUD for users

var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');


//get an user by wallet address
router.get('/user', auth.required, function(req, res, next){
    User.find({walletAddress: req.payload.walletAddress}).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

//authen user
router.post('/users/login', function(req, res, next){
    if(!req.body.walletAddress){
      return res.status(422).json({errors: {address: "can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  });

  // create new user
  router.post('/users', function(req, res, next){
    var user = new User();
  
    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.email = req.body.user.email;
    user.phoneNumber = req.body.user.phoneNumber;
  
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

  // update wallet address for new user
  router.put('/users/:walletAddress', function(req, res) {

  })

  //get list of guards that user is following
  router.get('/user/guards', auth.required, function(req, res, next){
    User.find({walletAddress: req.payload.walletAddress}).then(function(user){
       if(!user){ return res.sendStatus(401); }
     
       // Get list of guards that user is following 
       const currentUserGuards = user.guards;
 
       return res.json({guards: currentUserGuards});
     })
     .catch(next);
 }); 

  module.exports = router;