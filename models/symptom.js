var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SymptomSchema = Schema(
{
  symptom: {type: String, required: true}
});

SymptomSchema
.virtual('url')
.get(function() {
  return '/casebook/symptom/' + this._id;
});


module.exports = mongoose.model('Symptom', SymptomSchema);