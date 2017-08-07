var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var LabSchema = Schema({
  name: {type: String, required: true},
  street_address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  work_phone: {type: String, required: true}
});

LabSchema
.virtual('url')
.get(function() {
  return '/casebook/lab/' + this._id;
});

module.exports = mongoose.model('Lab', LabSchema);