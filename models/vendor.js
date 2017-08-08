var mongoose = require('mongoose');
var moment = require('moment');
var pnf = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


var Schema = mongoose.Schema;

var VendorSchema = Schema({
  name: {type: String, required: true},
  vendor_type: {type: String, required: true},
  street_address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  poc_first_name: {type: String, required: true},
  poc_family_name: {type: String, required: true},
  work_phone: {type: String, required: true},
  cell_phone: {type: String},
  email: {type: String}
});

VendorSchema
.virtual('url')
.get(function() {
  return '/casebook/vendor/' + this._id;
});

VendorSchema
.virtual('poc_name')
.get(function() {
  return this.poc_first_name + ' ' + this.poc_family_name;
});

// VendorSchema
// .virtual('phone')
// .get(function() {
//   var num = this.work_phone.toString();
//   var formatted_number = num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6, 4);
//   return formatted_number;
// });

VendorSchema
.virtual('phone')
.get(function() {
  var numProto = phoneUtil.parse(this.work_phone, 'US');
  var formatted_number = phoneUtil.format(numProto, pnf.NATIONAL);
  return formatted_number;
});

module.exports = mongoose.model('Vendor', VendorSchema);

