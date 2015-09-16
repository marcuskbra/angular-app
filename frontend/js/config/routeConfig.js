angular.module('minhasFinancas').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('contas', {
		url: '/contas',
		templateUrl: "view/templates/contas.html",
		controller: "contasCtrl"
	});
	$stateProvider.state('transacoes', {
		url: '/transacoes',
		templateUrl: "view/templates/transacoes.html",
		controller: "transacoesCtrl"
	});
	
	$urlRouterProvider.otherwise('/contas');
});