var mongoose = require('mongoose');
var moment = require('moment');
var pnf = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

var Schema = mongoose.Schema;

var PatientSchema = Schema({
  first_name: {type: String, required: true, max: 100},
  family_name: {type: String, required: true, max: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
  street_address: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: String},
  home_phone: {type: String},
  work_phone: {type: String},
  cell_phone: {type: String},
  email: {type: String},
  symptoms: {type: Boolean}
});

PatientSchema
.virtual('formatted_date_of_birth')
.get(function() {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

PatientSchema
.virtual('formatted_date_of_death')
.get(function() {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

PatientSchema
.virtual('url')
.get(function() {
  return '/casebook/patient/' + this._id;
});

PatientSchema
.virtual('name')
.get(function() {
  return this.first_name + ' ' + this.family_name;
});

PatientSchema
.virtual('hm_phone')
.get(function() {
  var formatted_number = '';
  if (this.work_phone)
  {
    var numProto = phoneUtil.parse(this.home_phone, 'US');
    formatted_number = phoneUtil.format(numProto, pnf.NATIONAL);
  }
  return formatted_number;
});

PatientSchema
.virtual('wk_phone')
.get(function() {
  var formatted_number = '';
  if (this.work_phone)
  {
    var numProto = phoneUtil.parse(this.work_phone, 'US');
    formatted_number = phoneUtil.format(numProto, pnf.NATIONAL);
  }
  return formatted_number;
});

PatientSchema
.virtual('cell')
.get(function() {
  var formatted_number = '';
  if (this.work_phone)
  {
    var numProto = phoneUtil.parse(this.cell_phone, 'US');
    formatted_number = phoneUtil.format(numProto, pnf.NATIONAL);
  }
  return formatted_number;
});

module.exports = mongoose.model('Patient', PatientSchema);

