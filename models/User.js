var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    walletAddress: String,
    firstName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    lastName: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    phoneNumber: {type: String, lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid']},
    bio: String,
    image: String,
    identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity' },
    guards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guard' }],
  }, {timestamps: true});




mongoose.model('User', UserSchema);
