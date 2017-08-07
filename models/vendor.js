var mongoose = require('mongoose');
var moment = require('moment');

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


module.exports = mongoose.model('Vendor', VendorSchema);

