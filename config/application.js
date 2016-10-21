var http = require('http'),
	path = require('path');

//-------------------------------------------
var express = require('express'),
	app = express(),
	bodyParser = require("body-parser");


//-------------------------------------------
var appRouter = require('./routing'),
	database = require('./database');

//-------------------------------------------
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(appRouter);
app.use(express.static(path.join(__dirname, '..', 'public/build')));


//-------------------------------------------
module.exports = {
	start: function() {
		database.connect(database.connectionString, function() {

			http.createServer(app).listen(3000, function(err) {
				if (err)
					return console.log('Cant start server');

				console.log('Server start at port:', 3000);
			});
		})
	}
}