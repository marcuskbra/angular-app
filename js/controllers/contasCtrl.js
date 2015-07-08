angular.module('minhasFinancas')
    .controller('contasCtrl', function ($scope) {
        $scope.appTitle = 'Minhas Finanças';
        $scope.contas = getContas();

        function getContas() {
            var contas = [
                {
                    nome: 'Santander',
                    saldo: '2222'
                },
                {
                    nome: 'Bradesco',
                    saldo: '45222'
                },
                {
                    nome: 'Itau',
                    saldo: '550'
                }
            ];
            return contas;
        }
    });