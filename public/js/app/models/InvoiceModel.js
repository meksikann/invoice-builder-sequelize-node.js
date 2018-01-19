function InvoiceModel($resource) {
    return $resource('/api/invoices/:id', {
        'id': '@id'
    }, {
        'create': { method: 'POST' },
        'save': { method: 'PUT' }
    });
}

angular.module('app.models.InvoiceModel', ['ngResource'])
    .factory('InvoiceModel', InvoiceModel);