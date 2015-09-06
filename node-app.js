// BASE SETUP
// =============================================================================
console.log('Starting server application');
// call the packages we need
var application_root = __dirname,
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    database = require('./backend/app/config/database'),
    app = express();


//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 3000;

app.use(express.static(application_root + '/frontend')); 

//load the routes
console.log('Loanding routes configuration');
require('./backend/app/routes/rest-routes')(express, app);

//Database
console.log('Connecting on database at ' + database.url);
mongoose.connect(database.url);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Server application started at port ' + port);