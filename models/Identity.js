var mongoose = require('mongoose');

var IdentitySchema = new mongoose.Schema({
    idCard: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    passPort: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    driveLicense: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created: { 
      type: Date,
     	default: Date.now
    }
  });

mongoose.model('Identity', IdentitySchema);