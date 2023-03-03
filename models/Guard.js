var mongoose = require('mongoose');

//Guard Schema
var GuardSchema = new mongoose.Schema({
    address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[0-9a-zA-Z]+$/, 'is invalid'], index: true},
    alias: {type: String, lowercase: true, match: [/^[0-9a-zA-Z]+$/, 'is invalid'], index: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    modifiedAt: { type: Date, default: Date.now }, 
    created: { 
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});

mongoose.model('Guard', GuardSchema);