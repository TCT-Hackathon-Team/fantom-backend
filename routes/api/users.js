var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var jwt = require('jsonwebtoken');
var config = require('../../config');
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

/**
 * @route GET /api/user/me
 */
router.get('/me',  function(req, res, next){
    console.log("me")
    User.findOne({userAddress: "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01c"}).then(function(user){
      if(!user){ return res.sendStatus(401); }
      console.log(user);
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });


  /**
 * @route GET /api/user/
 */
  router.get('/', function(req, res, next){

    // User.find().then(function(user){
    //   if(!user){ return res.sendStatus(401); }
  
    //   return res.json({user: user.toAuthJSON()});
    // }).catch(next);
    res.status(200).send({message: "ok"})
  });

/**
 * @route POST /api/user/login
 */
router.post('/login', function(req, res, next){
  const { signature, publicAddress } = req.body;
	if (!signature || !publicAddress)
		return res
			.status(400)
			.send({ error: 'Request should have signature and publicAddress' });

    return (
      User.findOne({userAddress: publicAddress  })
        ////////////////////////////////////////////////////
        // Step 1: Get the user with the given publicAddress
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!user) {
            res.status(401).send({
              error: `User with publicAddress ${publicAddress} is not found in database`,
            });
  
            return null;
          }
  
          return user;
        })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response
            throw new Error(
              'User is not defined in "Verify digital signature".'
            );
          }
  
          const msg = `I am signing my one-time nonce: ${user.nonce}`;
  
          // We now are in possession of msg, publicAddress and signature. We
          // will use a helper from eth-sig-util to extract the address from the signature
          const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
          const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
          });
  
          // The signature verification is successful if the address found with
          // sigUtil.recoverPersonalSignature matches the initial publicAddress
          if (address.toLowerCase() === publicAddress.toLowerCase()) {
            return user;
          } else {
            res.status(401).send({
              error: 'Signature verification failed',
            });
  
            return null;
          }
        })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then((user) => {
          if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response
  
            throw new Error(
              'User is not defined in "Generate a new nonce for the user".'
            );
          }
  
          user.nonce = Math.floor(Math.random() * 10000);
          return user.save();
        })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then((user) => {
          return new Promise<string>((resolve, reject) =>
            // https://github.com/auth0/node-jsonwebtoken
            jwt.sign(
              {
                payload: {
                  id: user._id,
                  publicAddress,
                },
              },
              config.secret,
              {
                algorithm: ["HS256"],
              },
              (err, token) => {
                if (err) {
                  return reject(err);
                }
                if (!token) {
                  return new Error('Empty token');
                }
                const maxAge = 1*60*60;
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                return resolve(token);
              }
            )
            
          );
        })
        .then((accessToken) => res.json({ accessToken }))
        .catch(next)
    );

  });

  // Tao nguoi dung moi cho app
  /**
 * @route POST /api/user
 */
  router.post('/', function(req, res, next){
    var user = new User();
    console.log(req.body)
    user.userAddress = req.body.user.userAddress;
    user.walletContractAddress = req.body.user.walletContractAddress;
    user.identityNumber = req.body.user.identityNumber;
    user.email = req.body.user.email;
    console.log(req.body)
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

  // Gan dia chi vi moi vao thong tin nguoi dung cu
  /**
 * @route PUT /api/user/chown
 * input: {
 *  oldAddress, newAddress
 * }
 */
  router.post('/chown', function(req, res) {
    console.log(req.body);
    return User.findOne({userAddress: req.body.oldAddress}).then(function(user){
      if(!user){ return res.sendStatus(401); }
      user.userAddress = req.body.newAddress;
      console.log(user);
      user.save();
    });
  })
 /** 
 * @route POST /api/user/addGuard
 * input: {
 *  oldAddress, newAddress
 * }
 */
  router.post('/addGuard', function(req, res, next){
  
    User.findOne({userAddress: "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01c"}).then(function(user){
      if (!user) { return res.sendStatus(401); }
      User.findOne({userAddress: req.body.guardAddress}).then(function(guard){
        return user.addGuard(guard._id).then(function(){
          return res.json({user: user.toAuthJSON()});
      })
    }).catch(next);
    })
});

  module.exports = router;