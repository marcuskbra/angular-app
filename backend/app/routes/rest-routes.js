
//ROUTES FOR OUR API
//=============================================================================
var ContaModel = require('../models/contaModel');

module.exports = function(express, app) {
	
	var	router = express.Router();              // get an instance of the express Router

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
	// create conta (accessed at POST http://localhost:8080/api/contas)
		.post(function(req, res) {
			
			var conta = new ContaModel(); // create a new instance of the model
			conta.nome = req.body.nome; // set the contas name (comes from the request)
			conta.saldo = req.body.saldo;
			conta.ativa = req.body.ativa;
			
			// save the object and check for errors
			conta.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({
					message : 'Conta criada!',
					conta: conta
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
	
	// on routes that end in /contas/:conta_id
	// ----------------------------------------------------
	router.route('/contas/:conta_id')
		.delete(function(req, res) {
			ContaModel.remove({
	            _id: req.params.conta_id
	        }, function(err, conta) {
	            if (err) {
	            	res.send(err);
	            }
	            res.json({ message: 'Conta apagada!' });
	        });
		})
		.put(function(req, res) {
			ContaModel.findById(req.params.conta_id, function(err, conta) {
				conta.nome = req.body.nome; // set the contas name (comes from the request)
				conta.saldo = req.body.saldo;
				conta.ativa = req.body.ativa;
				
				// save the object and check for errors
				conta.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({
						message : 'Conta atualizada!',
						conta: conta
					});
				});
	        });
		});
		
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	//REGISTER ACCESS TO STATIC HTML -------------------------------
	app.get('*', function(req, res) {
		// load the single view file (angular will handle the page changes on the front-end)
		res.sendFile('./frontend/index.html'); 
	});

}