angular.module('minhasFinancas')
	.service('contasService', function($http) {
		
		this.getContas = function() {
            
            return $http.get('/api/contas');
//                .success(function(data) {
//                	var _contas = data;
//                    console.log('Get success.');
//                    console.log(data);
//                    if (typeof(cb) === 'function') {
//                        cb(_contas);
//                    }
//                })
//                .error(function(data) {
//                    console.log('Error: ' + data);
//                });
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
		
		this.removerConta = function(conta, cb) {
            
            $http.delete('/api/contas/'+conta._id)
                .success(function(data) {
                    console.log('Delete success. ' + data);
                    if (typeof(cb) === 'function') {
                        cb(data);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
		};
	});