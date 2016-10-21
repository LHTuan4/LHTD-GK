var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: String,
	region: String
});

var Location = mongoose.model('Location', schema);

module.exports = Location;