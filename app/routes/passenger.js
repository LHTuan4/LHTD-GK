var Passenger = require('../models/Passenger'),
	express = require('express'),
	passengerRouter = express.Router();

passengerRouter.get("/",function (req, res, next) {
	Passenger.find({}, function(err, results){
		if (err)
			return res.status(500).end("Cant find Passenger");
		res.status(200).json(results);
	})
});

passengerRouter.post("/",function (req, res, next) {
	var passenger = new Passenger({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		address: req.body.address,
		telephoneNumber: req.body.telephoneNumber,
		flightID: req.body.flightID,
	})

	passenger.save(function (err){
		if(err)
			return res.status(500).end("Cant add Passenger");
		res.end("Success");
	})
});
module.exports = passengerRouter;

