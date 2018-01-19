angular.module('app.ctrls.ProductListCtrl', [
  'ngTable',

  'app.models.ProductModel'
])
  .controller('ProductListCtrl', ProductListCtrl);

ProductListCtrl.$inject = ['$scope', 'NgTableParams', 'ProductModel'];

function ProductListCtrl($scope, NgTableParams, ProductModel) {

  $scope.tableParams = new NgTableParams({}, {
    counts: [],
    getData: function ($defer, params) {
      $scope.loading = true;

      ProductModel.query(function(data) {
        $scope.loading = false;
        $defer.resolve(data);
      });
    }
  });

}