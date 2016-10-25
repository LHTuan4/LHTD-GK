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

flightRouter.put("/:id",function(req, res, next){

	console.log("ABCDEF", req.params);
	Flight
		.findOne( {id: req.params.id})
		.exec((err, result) => {
			if(err){	
				console.log("wrong");
			}
		
			if(!result) return res.status(500).end("Cant find Flight");
		
			result.chair -= Number(req.body.chair);
			if(result.chair<0){
				return res.status(400).json({message: "needChair"});
			}
			else{
				result.save((err) => {
				console.log(result);
				//if(err)
				return res.end("Success");
			});
			}
			
		});
})

module.exports = flightRouter;

