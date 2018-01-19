angular.module('app.ctrls.CustomerListCtrl', [
  'ngTable',

  'app.models.CustomerModel'
])
  .controller('CustomerListCtrl', CustomerListCtrl);

CustomerListCtrl.$inject = ['$scope', 'NgTableParams', 'CustomerModel'];

function CustomerListCtrl($scope, NgTableParams, CustomerModel) {

  $scope.tableParams = new NgTableParams({}, {
    counts: [],
    getData: function ($defer, params) {
      $scope.loading = true;

      CustomerModel.query(function(data) {
        console.log();
        console.log(data);
        $scope.loading = false;
        $defer.resolve(data);
      });
    }
  });

}