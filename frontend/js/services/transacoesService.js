angular.module('minhasFinancas')
	.service('transacoesService', function($http) {
		
		this.getTransacoes = function() {
            return $http.get('/api/transacoes');
		};
    
		this.adicionarTransacao = function(transacao) {
            return $http.post('/api/transacoes', angular.copy(transacao));
		};
		
		this.removerTransacao = function(transacao) {
			return $http.delete('/api/transacoes/'+transacao._id);
		};
		
		this.atualizarTransacao = function(transacao) {
			return $http.put('/api/transacoes/'+transacao._id);
		};
	});