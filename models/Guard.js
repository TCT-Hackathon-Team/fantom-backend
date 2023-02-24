var mongoose = require('mongoose');

var GuardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true}
  }, {timestamps: true});

mongoose.model('Guard', GuardSchema);