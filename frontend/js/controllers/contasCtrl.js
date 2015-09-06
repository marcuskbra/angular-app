angular.module('minhasFinancas')
    .controller('contasCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'contasService', function($scope, $mdSidenav, $mdDialog, contasService){
	    $scope.toggleSidenav = function(menuId) {
	    	$mdSidenav(menuId).toggle();
	    };
        $scope.appTitle = 'Minhas Finanças';
        
        $scope.getContas = function() {
        	contasService.getContas()
        		.success(function(data) {
					console.log('Get success.');
					console.log(data);
					$scope.contas = data;
        		})
				.error(function(data) {
					console.log('Error: ' + data);
				});
        };
        $scope.getContas();

        $scope.adicionarConta = function(conta) {
        	contasService.adicionarConta(conta)
        		.success(function(data) {
                    console.log('Post success. ' + data);
                    $scope.getContas();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                delete $scope.conta;
        };

        $scope.removerContas = function(contas) {
        	contas.forEach(function(conta) {
        		var indexOf = $scope.tableConfig.selectedRows.indexOf(conta);
        		if (indexOf !== -1) {
        			contasService.removerConta(conta)
	        			.success(function(data) {
	                        console.log('Delete success. ' + data);
	                    })
	                    .error(function(data) {
	                        console.log('Error: ' + data);
	                    });
        		}
			});
        	$scope.tableConfig.selectedRows = [];
        	$scope.getContas();
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

