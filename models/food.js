var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var FoodSchema = Schema({
  name: {type: String, required: true},
  category
  : {type: String, required: true},
  preparation: {type: String, required: true},
});

FoodSchema.virtual('url')
.get(function() {
  return '/casebook/food/' + this._id;
});

module.exports = mongoose.model('Food', FoodSchema);

