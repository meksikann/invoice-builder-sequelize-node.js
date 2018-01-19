angular.module('app.ctrls.InvoiceEditCtrl', [
    'app.models.InvoiceModel'
])
    .controller('InvoiceEditCtrl', InvoiceEditCtrl);

InvoiceEditCtrl.$inject = ['$scope', 'item', 'CustomerModel'];

function InvoiceEditCtrl($scope, item, InvoiceModel) {
    $scope.item = item || new InvoiceModel({});

    // save or create customer
    $scope.saveInvoice = function() {
        var save = $scope.item.id ? $scope.item.$save : $scope.item.$create;

        return save.call($scope.item);
    };

    $scope.okModal = function() {
        $scope.saveInvoice().then(function(invoice) {
            $scope.$close(invoice);
        });
    };
}