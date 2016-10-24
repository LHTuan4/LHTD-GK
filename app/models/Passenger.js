var mongoose = require('mongoose');

var schema = mongoose.Schema({
	firstName: String,
	lastName: String,
	address: String,
	telephoneNumber: String,
	flightID: String,
	paynment: Number,
});

var Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;