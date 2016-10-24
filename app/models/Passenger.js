var mongoose = require('mongoose');

var schema = mongoose.Schema({
	id: String,
	firstName: String,
	lastName: String,
	address: String,
	telephoneNumber: String,
	flightID: String,
});

var Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;