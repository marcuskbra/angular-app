angular.module('minhasFinancas')
	.service('contasService', function() {
		var _contas;
		var _getContas = function() {
			if (!_contas) {
				_contas = [
					          { nome: 'Santander', saldo: 2222, active: 'true' },
					          { nome: 'Bradesco', saldo: 4522, active: 'true' },
					          { nome: 'Itau', saldo: 550, active: 'true' },
					          { nome: 'HSBC', saldo: 50, active: 'true' }
				          ];
			}
	    	return _contas;
		};
		
		this.getContas = _getContas;
		this.adicionarConta = function(conta) {
			_getContas().push(angular.copy(conta));
		};
	});