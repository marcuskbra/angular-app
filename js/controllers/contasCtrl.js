angular.module('minhasFinancas')
    .controller('contasCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	    $scope.toggleSidenav = function(menuId) {
	    	$mdSidenav(menuId).toggle();
	    };
        $scope.appTitle = 'Minhas Finanças';
        $scope.contas = getContas();

        $scope.adicionarConta = function(conta) {
			$scope.contas.push(angular.copy(conta));
			delete $scope.conta;
		};

        $scope.removerContas = function(contas) {
        	$scope.contas = contas.filter(function(conta) {
				if (!conta.selecionado) {
					return conta;
				}
			});
        	console.log($scope.contas)
		};
		
		$scope.isContaSelecionada = function(contas) {
			return contas.some(function(conta) {
				return conta.selecionado;
			});
		};
		
        function getContas() {
            var contas = [
                {
                    nome: 'Santander', saldo: '2222'
                },
                {
                    nome: 'Bradesco', saldo: '45222'
                },
                {
                    nome: 'Itau', saldo: '550'
                }
            ];
            return contas;
        }
    }]);