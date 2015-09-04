angular.module('minhasFinancas')
    .controller('contasCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'contasService', function($scope, $mdSidenav, $mdDialog, contasService){
	    $scope.toggleSidenav = function(menuId) {
	    	$mdSidenav(menuId).toggle();
	    };
        $scope.appTitle = 'Minhas Finanças';
        contasService.getContas(function(data) {
            $scope.contas = data;
        });

        $scope.adicionarConta = function(conta) {
        	contasService.adicionarConta(conta, function () {
                delete $scope.conta;
                contasService.getContas(function(data) {
                    $scope.contas = data;
                });
            });
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
      	      templateUrl: 'view/templates/modal-add-conta.html',
      	      parent: angular.element(document.body),
      	      targetEvent: ev,
      	    })
      	    .then(function(conta) {
      	      $scope.adicionarConta(conta);
      	    }, function() {
      	      //console.log('You cancelled the dialog.');
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

