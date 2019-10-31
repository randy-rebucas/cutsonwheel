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

module.exports = mongoose.model('Users', userSchema);
// personSchema.virtual('fullName').get(function() {
//   return this.firstName + ' ' + this.lastName
// })

// personSchema.virtual('fullName').set(function(name) {
//   let str = name.split(' ')

//   this.firstName = str[0]
//   this.lastName = str[1]
// })
