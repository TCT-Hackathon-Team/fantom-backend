var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function(req, res, next){
    User.find({walletAddress: req.payload.walletAddress}).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });


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

  // Tao nguoi dung moi cho app
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

  // Gan dia chi vi moi vao thong tin nguoi dung cu
  router.put('/users/:walletAddress', function(req, res) {

  })

  module.exports = router;