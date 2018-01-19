function ProductModel($resource) {
  return $resource('/api/products/:id', {
    'id': '@id'
  }, {
    'create': { method: 'POST' },
    'save': { method: 'PUT' }
  });
}

angular.module('app.models.ProductModel', ['ngResource'])
  .factory('ProductModel', ProductModel);