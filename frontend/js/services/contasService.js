angular.module('minhasFinancas')
	.service('contasService', function($http) {
		
		this.getContas = function() {
            return $http.get('/api/contas');
		};
    
		this.adicionarConta = function(conta) {
            return $http.post('/api/contas', angular.copy(conta));
		};
		
		this.removerConta = function(conta) {
			return $http.delete('/api/contas/'+conta._id);
		};
		
		this.atualizarConta = function(conta) {
			return $http.put('/api/contas/'+conta._id);
		};
	});