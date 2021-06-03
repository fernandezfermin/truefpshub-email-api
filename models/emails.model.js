const mongoose = require('mongoose')




const EmailSchema = new mongoose.Schema({

                email: { type: String, unique: true, required: true, exists: false },
                clientIp: { type: String, required: true },
                registered_at: {type: Date, default: Date.now},

}, { versionKey: false })

// Sets the created_at parameter equal to the current time
EmailSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
      this.created_at = now
  }
  next();
});



module.exports = mongoose.model('Email', EmailSchema)