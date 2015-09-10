angular.module('minhasFinancas')
    .controller('transacoesCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'transacoesService', function($scope, $mdSidenav, $mdDialog, transacoesService){
	    $scope.toggleSidenav = function(menuId) {
	    	$mdSidenav(menuId).toggle();
	    };
        
        $scope.getTransacoes = function() {
        	transacoesService.getTransacoes()
        		.success(function(data) {
					console.log('Get success.');
					console.log(data);
					$scope.transacoes = data;
        		})
				.error(function(data) {
					console.log('Error: ' + data);
				});
        };
        $scope.getTransacoes();

        $scope.adicionarTransacao = function(transacao) {
        	transacoesService.adicionarTransacao(transacao)
        		.success(function(data) {
                    console.log('Post success. ' + data);
                    $scope.getTransacoes();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                delete $scope.transacao;
        };

        $scope.removerTransacoes = function(transacoes) {
        	transacoes.forEach(function(transacao) {
        		var indexOf = $scope.tableConfig.selectedRows.indexOf(transacao);
        		if (indexOf !== -1) {
        			transacoesService.removerTransacao(transacao)
	        			.success(function(data) {
	                        console.log('Delete success. ' + data);
	                        $scope.getTransacoes();
	                    })
	                    .error(function(data) {
	                        console.log('Error: ' + data);
	                    });
        		}
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
      	      controller: 'transacoesCtrl',
      	      templateUrl: 'view/templates/modal-add-transacao.html',
      	      parent: angular.element(document.body),
      	      targetEvent: ev,
      	    })
      	    .then(function(transacao) {
      	    	$scope.adicionarTransacao(transacao);
      	    }, function() {
      	      //console.log('You cancelled the dialog.');
      	    });
		};
        
        $scope.skipPagination = function (item, index) {
    	  return index >= ($scope.tableConfig.limit * ($scope.tableConfig.page - 1));
    	};
    	
		$scope.confirmModal = function(transacao) {
			$mdDialog.hide(transacao);
		};
		$scope.cancelModal = function() {
			$mdDialog.cancel();
		};
    }]);

