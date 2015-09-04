angular.module('minhasFinancas')
	.service('contasService', function($http) {
		var _contas;
		
		this.getContas = function(cb) {
            
            $http.get('/api/contas')
                .success(function(data) {
                    _contas = data;
                    console.log('Get success.');
                    console.log(data);
                    if (typeof(cb) === 'function') {
                        cb(_contas);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
		};
    
		this.adicionarConta = function(conta, cb) {
            
            $http.post('/api/contas', angular.copy(conta))
                .success(function(data) {
                    console.log('Post success. ' + data);
                    if (typeof(cb) === 'function') {
                        cb(data);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
		};
	});