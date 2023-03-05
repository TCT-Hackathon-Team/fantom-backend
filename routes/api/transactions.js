var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');
var auth = require('../auth');

/** 
 * @route GET /api/transaction
 */
router.get('/',  function(req, res, next){
    console.log("transaction")
    Transaction.findOne({from: "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01c"}).then(function(transaction){
      if(!transaction){ return res.json({message: "Transaction not found"}) }
      return res.json({transaction: transaction.toAuthJSON()});
    }).catch(next);
  });

/** 
 * @route POST /api/transaction
 */
router.post('/', function(req, res, next){
    var transaction = new Transaction;
    transaction.addresses = "";
    transaction.txHash = req.body.transaction.txHash;
    transaction.from = req.body.transaction.from;
    transaction.userName = req.body.transaction.userName;
    transaction.value = req.body.transaction.value;
    transaction.txType = req.body.transaction.txType;
    transaction.save().then(function(){
        return res.json({transaction: transaction.toAuthJSON()});
    });
})


  module.exports = router;