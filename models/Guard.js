var mongoose = require('mongoose');

var GuardSchema = new mongoose.Schema({
    address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created: { 
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});

mongoose.model('Guard', GuardSchema);