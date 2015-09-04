// BASE SETUP
// =============================================================================

// call the packages we need
var application_root = __dirname,
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    ContaModel = require('./backend/models/conta'),
    app = express();


//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

//ROUTES FOR OUR API
//=============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'RESTful API is running!' });   
});

// more routes for our API will happen here

//on routes that end in /contas
//----------------------------------------------------
router.route('/contas')
	// create a bear (accessed at POST http://localhost:8080/api/contas)
	.post(function(req, res) {
	
		var conta = new ContaModel(); // create a new instance of the model
		conta.nome = req.body.nome; // set the contas name (comes from the request)
		conta.saldo = req.body.saldo;
		conta.ativa = req.body.ativa;
	
		// save the bear and check for errors
		conta.save(function(err) {
			if (err)
				res.send(err);
	
			res.json({
				message : 'Conta criada!'
			});
		});
	
	})
	.get(function(req, res) {
		ContaModel.find(function(err, contas) {
            if (err)
                res.send(err);

            res.json(contas);
        });
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

//Database
mongoose.connect('mongodb://localhost/MinhasFinancasDB');

//REGISTER ACCESS TO STATIC HTML -------------------------------
app.use(express.static('.'));

console.log('Magic happens on port ' + port);