var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CaseSchema = Schema({
  date_reported: {type: Date, required: true},
  date_started: {type: Date},
  germ: {type: Schema.ObjectId, ref: 'Germ', required: true},
  food_vendor: {type: Schema.ObjectId, ref: 'Vendor'},
  food: [{type: Schema.ObjectId, ref: 'Food'}],
  patient_0: {type: Schema.ObjectId, ref: 'Patient', required: true},
  other_patients: [{type: Schema.ObjectId, ref: 'Patient'}],
  symptoms: {type: String, required: true},
  lab_evidence: {type: String},
  lab: {type: Schema.ObjectId, ref: 'Lab'},
  medical_facility: {type: Schema.ObjectId, ref: 'MedicalFacility'},
  notes: {type: String}
});

CaseSchema
.virtual('formatted_date_reported')
.get(function() {
  return this.date_reported ? moment(this.date_reported).format('YYYY-MM-DD') : '';
});

CaseSchema
.virtual('formatted_date_started')
.get(function() {
  return this.date_started ? moment(this.date_started).format('YYYY-MM-DD') : '';
});

CaseSchema
.virtual('url')
.get(function() {
  return '/casebook/case/' + this._id;
});

module.exports = mongoose.model('Case', CaseSchema);

