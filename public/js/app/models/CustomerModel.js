function CustomerModel($resource) {
  return $resource('/api/customers/:id', {
    'id': '@id'
  }, {
    'create': { method: 'POST' },
    'save': { method: 'PUT' }
  });
}

angular.module('app.models.CustomerModel', ['ngResource'])
  .factory('CustomerModel', CustomerModel);