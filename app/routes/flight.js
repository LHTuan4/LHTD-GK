var Flight = require('../models/Flight'),
	express = require('express'),
	flightRouter = express.Router();

flightRouter.get("/",function (req, res, next) {
	console.log(req.query.date);
	var query = {};
	if(req.query.from)
		query.from = req.query.from;
	if(req.query.to)
		query.to = req.query.to;
	if(req.query.date)
		query.date = Date.parse(req.query.date);
	Flight.find(query, function(err, results){
		if (err)
			return res.status(500).end("Cant find Flight");
		res.status(200).json(results);
	})
});

flightRouter.post("/",function (req, res, next) {
	var flight = new Flight({
		id: req.body.id,
		from: req.body.from,
		to: req.body.to,
		date: req.body.date,
		time: req.body.time,
		type: req.body.type,
		pricetype: req.body.pricetype,
		chair: req.body.chair,
		price: req.body.price,
	})

	flight.save(function (err){
		if(err)
			return res.status(500).end("Cant add Flight");
		res.end("Success");
	})
});
module.exports = flightRouter;

