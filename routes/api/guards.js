//CRUD for guards

var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Guard = mongoose.model('Guard');

//get all guards
router.get('/guards', function(req, res, next){
    Guard.find().then(function(guards){
        if(!guards){ return res.sendStatus(401); }
    
        return res.json({guards: guards});
    }).catch(next);
    }
);

//get a guard by wallet address
router.get('/guard', function(req, res, next){
    Guard.find({walletAddress: req.payload.walletAddress}).then(function(guard){
        if(!guard){ return res.sendStatus(401); }
    
        return res.json({guard: guard});
    }).catch(next);
    }
);

//get a guard by alias
router.get('/guard/:alias', function(req, res, next){
    Guard.find({alias: req.params.alias}).then(function(guard){
        if(!guard){ return res.sendStatus(401); }
        
        return res.json({guard: guard});
    }).catch(next);
    }
);

// create new guard
router.post('/guards', function(req, res, next){
    var guard = new Guard();
    
    guard.address = req.body.guard.address;
    guard.alias = req.body.guard.alias;
    
    guard.save().then(function(){
        return res.json({guard: guard.toAuthJSON()});
    }).catch(next);
}
);

//update guard
router.put('/guards/:id', function(req, res, next){
    Guard.findById(req.params.id).then(function(guard){
        if(!guard){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.guard.address !== 'undefined'){
            guard.address = req.body.guard.address;
        }
        if(typeof req.body.guard.alias !== 'undefined'){
            guard.alias = req.body.guard.alias;
        }
        guard.modifiedAt = Date.now();

        return guard.save().then(function(){
            return res.json({guard: guard.toAuthJSON()});
        });
    }).catch(next);
});

//delete guard
router.delete('/guards/:id', function(req, res, next){
    Guard.findById(req.params.id).then(function(guard){
        if(!guard){ return res.sendStatus(401); }
        
        return guard.remove().then(function(){
            return res.sendStatus(204);
        });
    }).catch(next);
});

