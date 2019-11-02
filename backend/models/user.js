const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  midlename: { type: String, default: null },
  lastname: { type: String, required: true },
  contact: { type: String, default: null },
  gender: { type: String, default: null },
  address: [{
    current: { type: Boolean },
    address1: { type: String }, // street address
    address2: { type: String }, // street address line 2
    city: { type: String },
    province: { type: String },
    postalCode: { type: Number },
    country: { type: String }
  }],
  birthdate: { type: Date, default: null },
  created: { type: Date, default: Date.now },
  type: { type: String, default: 'member' }
});

userSchema.virtual('fullName').get(() => {
  return this.firstName + ' ' + this.lastName
})

userSchema.virtual('fullName').set((name) => {
  let str = name.split(' ')

  this.firstName = str[0]
  this.lastName = str[1]
})

module.exports = mongoose.model('Users', userSchema);

