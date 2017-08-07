var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GermSchema = Schema(
{
  full_name: {type: String, required: true, max: 100},
  short_name: {type: String, max: 100},
  sources: {type: String},
  incubation_period: {type: String},
  symptoms: [{type: Schema.ObjectId, ref: 'Symptom'}],
  duration: {type: String},
  self_care: [{type: Schema.ObjectId, ref: 'SelfCare'}],
  prevention: [{type: Schema.ObjectId, ref: 'PreventionTip'}]
});

GermSchema
.virtual('url')
.get(function() {
  return '/casebook/germ/' + this._id;
});

module.exports = mongoose.model('Germ', GermSchema);