var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransacaoSchema = new Schema({
	data : Date,
	descricao : String,
	tipo : String,
	categoria : String,
	conta : Object,
	valor : Number,
	efetivada: Boolean
});

module.exports = mongoose.model('Transacao', ContaSchema);