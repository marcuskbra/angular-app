angular.module('minhasFinancas')
	.service('transacoesService', function($http) {
		
		this.getTransacoes = function() {
            return $http.get('/api/transacoes');
		};
    
		this.adicionarTransacao = function(conta) {
            return $http.post('/api/transacoes', angular.copy(conta));
		};
		
		this.removerTransacao = function(conta) {
			return $http.delete('/api/transacoes/'+conta._id);
		};
		
		this.atualizarTransacao = function(conta) {
			return $http.put('/api/transacoes/'+conta._id);
		};
	});