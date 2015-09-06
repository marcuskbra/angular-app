var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContaSchema = new Schema({
	nome : String,
	saldo : String,
	ativa : String
});

module.exports = mongoose.model('Conta', ContaSchema);