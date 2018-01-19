angular.module('app.ctrls.CustomerEditCtrl', [
  'app.models.CustomerModel'
])
  .controller('CustomerEditCtrl', CustomerEditCtrl);

CustomerEditCtrl.$inject = ['$scope', 'item', 'CustomerModel'];

function CustomerEditCtrl($scope, item, CustomerModel) {
  $scope.item = item || new CustomerModel({});

  // save or create customer
  $scope.saveCustomer = function() {
    var save = $scope.item.id ? $scope.item.$save : $scope.item.$create;

    return save.call($scope.item);
  };

  $scope.okModal = function() {
    $scope.saveCustomer().then(function(customer) {
      $scope.$close(customer);
    });
  };
}