var mongoose = require('mongoose');

var GuardSchema = new mongoose.Schema({
    _id: {
    type: mongoose.Types.ObjectId,
    auto: true},
    address: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created: { 
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});

  GuardSchema.methods.toJSONFor = function(){
    return {
      address: this.address
    }
  }

mongoose.model('Guard', GuardSchema);