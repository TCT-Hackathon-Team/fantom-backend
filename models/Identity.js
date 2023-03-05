var mongoose = require('mongoose');

var IdentitySchema = new mongoose.Schema({
    idCard: {type: String, lowercase: true, match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    passPort: {type: String, lowercase: true, match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    driveLicense: {type: String, lowercase: true, unique: true,  match: [/\S+@\S+\.\S+/, 'is invalid']},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created: { 
      type: Date,
     	default: Date.now
    }
  });


  IdentitySchema.methods.toJSONFor = function(){
    return {
      idCard: this.idCard,
      passPort: this.passPort,
      driveLicense: this.driveLicense,
    }
  }

mongoose.model('Identity', IdentitySchema);