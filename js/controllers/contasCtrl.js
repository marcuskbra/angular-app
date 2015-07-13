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
        		var indexOf = $scope.tableConfig.selectedRows.indexOf(conta);
        		return indexOf === -1;
			});
        	$scope.tableConfig.selectedRows = [];
		};
		
        $scope.tableConfig = {
          order: 'nome',
          limit: 5,
          page: 1,
          selectedRows: []
        };
        
        $scope.skipPagination = function (item, index) {
    	  return index >= ($scope.tableConfig.limit * ($scope.tableConfig.page - 1));
    	};
    	
    }]);

function getContas() {
	var contas = [
          {
        	  nome: 'Santander', saldo: 2222, active: 'true'
          },
          {
        	  nome: 'Bradesco', saldo: 4522, active: 'true'
          },
          {
        	  nome: 'Itau', saldo: 550, active: 'true'
          },
          {
        	  nome: 'HSBC', saldo: 50, active: 'true'
          }
      ];
	return contas;
}