var mongoose = require('mongoose');

var IdentitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idCard: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    passPort: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    driveLicense: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
  }, {timestamps: true});

mongoose.model('Identity', IdentitySchema);