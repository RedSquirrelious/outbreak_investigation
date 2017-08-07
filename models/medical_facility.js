var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MedicalFacilitySchema = Schema({
  name: {type: String, required: true},
  street_address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  work_phone: {type: String, required: true}
});

MedicalFacilitySchema
.virtual('url')
.get(function() {
  return '/casebook/medical_facility/' + this._id;
});


module.exports = mongoose.model('MedicalFacility', MedicalFacilitySchema);