var mongoose = require('mongoose');

var schema = mongoose.Schema({
	id: String,
	from: String,
	to: String,
	date: Date,
	time: String,
	type: String,
	pricetype: String,
	chair: Number,
	price: Number,
});

var Flight = mongoose.model('Flight', schema);

module.exports = Flight;