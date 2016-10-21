var mongoose = require('mongoose');
mongoose.Promise = global.Promise;



module.exports = {

	connectionString: 'mongodb://localhost/flightdb',

	connect: function(connStr, callback) {

		mongoose.connect(connStr, function(err) {

			if(err)
				return console.log('Cant connect to database');

			console.log('Connect to databse success');
			callback();
		});
	}

}