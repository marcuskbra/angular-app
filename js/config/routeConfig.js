angular.module('minhasFinancas').config(function($routeProvider) {
	$routeProvider.when('/contas', {
		templateUrl: "view/templates/contas.html",
		controller: "contasCtrl"
	});
	$routeProvider.when('/transacoes', {
		templateUrl: "view/templates/transacoes.html",
		controller: "transacoesCtrl"
	});
	
	$routeProvider.otherwise({redirectTo: '/contas'});
});