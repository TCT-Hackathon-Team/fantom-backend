var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    _id: {
    type: mongoose.Types.ObjectId,
    auto: true},
    address: String,
    txHash: String,
    from: String,
    userName: String,
    value: String,
    txType: String,
    created: { 
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});


TransactionSchema.methods.toAuthJSON = function(){
    return {
      txHash: this.txHash,
      from: this.from,
      userName: this.userName,
      value: this.value,
      txType: this.txType
    };
  };

  mongoose.model('Transaction', TransactionSchema);