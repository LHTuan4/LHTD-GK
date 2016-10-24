var express = require('express'),
	locationRouter = require("../app/routes/location"),
	flightRouter = require("../app/routes/flight"),
	passengerRouter = require("../app/routes/passenger")
	appRouter = express.Router();

appRouter.get('/', function(req, res) {
	res.redirect('/index.html');
});

appRouter.use('/api/location', locationRouter);
appRouter.use('/api/flight', flightRouter);
appRouter.use('/api/passenger', passengerRouter);
module.exports = appRouter;