var appName = 'app',
    module = angular.module(appName, [
        'ui.router',
        'ngTable',

        // app
        'app.models.CustomerModel',
        'app.models.ProductModel',
        'app.models.InvoiceModel',

        'app.ctrls.CustomerListCtrl',
        'app.ctrls.CustomerEditCtrl',
        'app.ctrls.ProductListCtrl',
        'app.ctrls.ProductEditCtrl',
        'app.ctrls.InvoiceListCtrl',
        'app.ctrls.InvoiceEditCtrl'
    ])
        .constant('_', window._)
        // use in views, ng-repeat="x in _.range(3)"
        .run(function ($rootScope) {
            $rootScope._ = window._;
        });


// config
module.config(function ($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
    // Customers
        .state('customers', {
            url: '/customers',
            templateUrl: "views/customer-list.html",
            controller: 'CustomerListCtrl'
        })
        .state('customerNew', {
            url: '/customers/new',
            templateUrl: "views/customer-edit.html",
            controller: 'CustomerEditCtrl',
            resolve: {
                item: function () {
                    return null;
                }
            }
        })
        .state('customerEdit', {
            url: '/customers/:id',
            templateUrl: "views/customer-edit.html",
            controller: 'CustomerEditCtrl',
            resolve: {
                item: ['$stateParams', 'CustomerModel', function ($stateParams, CustomerModel) {
                    return CustomerModel.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        // Products
        .state('products', {
            url: '/products',
            templateUrl: "views/product-list.html",
            controller: 'ProductListCtrl'
        })
        .state('productNew', {
            url: '/products/new',
            templateUrl: "views/product-edit.html",
            controller: 'ProductEditCtrl',
            resolve: {
                item: function () {
                    return null;
                }
            }
        })
        .state('productEdit', {
            url: '/products/:id',
            templateUrl: "views/product-edit.html",
            controller: 'ProductEditCtrl',
            resolve: {
                item: ['$stateParams', 'ProductModel', function ($stateParams, ProductModel) {
                    return ProductModel.get({id: $stateParams.id}).$promise;
                }]
            }
        })

        //invoices
        .state('invoices', {
            url: '/invoice',
            templateUrl: "views/invoice-list.html",
            controller: 'InvoiceListCtrl'
        })
        .state('invoiceNew', {
            url: '/invoices/new',
            templateUrl: "views/invoice-edit.html",
            controller: 'InvoiceEditCtrl',
            resolve: {
                item: function () {
                    return null;
                }
            }
        })
        .state('invoiceEdit', {
            url: '/invoices/:id',
            templateUrl: "views/invoice-edit.html",
            controller: 'InvoiceEditCtrl',
            resolve: {
                item: ['$stateParams', 'InvoiceModel', function ($stateParams, InvoiceModel) {
                    return InvoiceModel.get({id: $stateParams.id}).$promise;
                }]
            }
        })
    ;
});

angular.element(document).ready(function () {
    angular.bootstrap(document, [appName]);
});