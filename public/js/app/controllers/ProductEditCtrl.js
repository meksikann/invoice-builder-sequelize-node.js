angular.module('app.ctrls.ProductEditCtrl', [
  'app.models.ProductModel'
])
  .controller('ProductEditCtrl', ProductEditCtrl);

ProductEditCtrl.$inject = ['$scope', 'item', 'ProductModel'];

function ProductEditCtrl($scope, item, ProductModel) {
  $scope.item = item || new ProductModel({});

  // save or create customer
  $scope.saveProduct = function() {
    var save = $scope.item.id ? $scope.item.$save : $scope.item.$create;

    return save.call($scope.item);
  };
  
  $scope.okModal = function() {
    $scope.saveProduct().then(function(product) {
      $scope.$close(product);
    });
  };
}