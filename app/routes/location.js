var Location = require('../models/Location'),
	express = require('express'),
	locationRouter = express.Router();

locationRouter.get("/",function (req, res, next) {
	Location.find({}, function(err, results){
		if (err)
			return res.status(500).end("Cant find Location");
		res.status(200).json(results);
	})
});

locationRouter.post("/",function (req, res, next) {
	var location = new Location({
		name: req.body.name,
		region: req.body.region
	})

	location.save(function (err){
		if(err)
			return res.status(500).end("Cant add Location");
		res.end("Success");
	})
});
module.exports = locationRouter;

