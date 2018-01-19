angular.module('app.ctrls.InvoiceListCtrl', [
    'ngTable',

    'app.models.ProductModel'
])
    .controller('InvoiceListCtrl', InvoiceListCtrl);

InvoiceListCtrl.$inject = ['$scope', 'NgTableParams', 'InvoiceModel'];

function InvoiceListCtrl($scope, NgTableParams, InvoiceModel) {

    $scope.tableParams = new NgTableParams({}, {
        counts: [],
        getData: function ($defer, params) {
            $scope.loading = true;

            InvoiceModel.query(function(data) {
                $scope.loading = false;
                $defer.resolve(data);
            });
        }
    });

}