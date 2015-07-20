angular.module('minhasFinancas')
    .controller('contasCtrl', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog){
	    $scope.toggleSidenav = function(menuId) {
	    	$mdSidenav(menuId).toggle();
	    };
        $scope.appTitle = 'Minhas Finanças';
        $scope.contas = getContas();

        $scope.adicionarConta = function(conta) {
			try {
				$scope.contas.push(angular.copy(conta));
				delete $scope.conta;
			} catch (e) {
				console.error(e);
			}
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
        
        $scope.openModalAdd = function(ev) {
        	$mdDialog.show({
      	      controller: 'contasCtrl',
      	      templateUrl: 'templates/modal-add-conta.html',
      	      parent: angular.element(document.body),
      	      targetEvent: ev,
      	    })
      	    .then(function(conta) {
      	      console.log('Adicionando Conta. ' + conta);
      	      $scope.adicionarConta(conta);
      	    }, function() {
      	      console.log('You cancelled the dialog.');
      	    });
		};
        
        $scope.skipPagination = function (item, index) {
    	  return index >= ($scope.tableConfig.limit * ($scope.tableConfig.page - 1));
    	};
    	
		$scope.confirmModal = function(conta) {
			$mdDialog.hide(conta);
		};
		$scope.cancelModal = function() {
			$mdDialog.cancel();
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