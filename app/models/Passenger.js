var mongoose = require('mongoose');

var schema = mongoose.Schema({
	firstName: String,
	lastName: String,
	address: String,
	telephoneNumber: String,
	flightID: String,
	payment: Number,
});

var Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;