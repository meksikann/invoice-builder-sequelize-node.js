angular.module('app.ctrls.InvoiceEditCtrl', [
    'app.models.InvoiceModel'
])
    .controller('InvoiceEditCtrl', InvoiceEditCtrl);

InvoiceEditCtrl.$inject = ['$scope', 'item', 'InvoiceModel', 'invoiceService', 'invoiceItemService', '$log'];

function InvoiceEditCtrl($scope, item, InvoiceModel, invoiceService, invoiceItemService, $log) {

    $scope.onInit = onInit;
    $scope.saveInvoice = saveInvoice;
    $scope.removeInvoiceItem = removeInvoiceItem;
    $scope.saveInvoiceItem = saveInvoiceItem;
    $scope.addProduct = addProduct;

    $scope.invoiceItems = [];
    $scope.products = [];
    $scope.customers = [];
    $scope.customerId;
    $scope.totalPrice = 0;
    $scope.productId;

    let dataLoadSuccess;
    let generalProducts = [];


    function onInit() {
        dataLoadSuccess = true;

        $scope.item = item || new InvoiceModel({});

        if (item) {
            $scope.customerId = item.customer_id.toString();
        }

        //load customer list
        invoiceService.getCustomers()
            .then(function (success) {
                saveCustomers(success);
                //load product list
                invoiceService.getProducts()
                    .then(function (success) {
                        saveProducts(success);
                        //if edit invoice - load invoice items
                        if ($scope.item.id && dataLoadSuccess) {
                            invoiceService.getInvoiceItems($scope.item.id)
                                .then(function (success) {
                                    saveInvoiceItems(success);
                                }, function (error) {
                                    alertError(error);
                                });
                        }
                    }, function (error) {
                        alertError(error);
                    });
            }, function (error) {
                alertError(error);
            });
    }

    function saveInvoice(invoice) {
        $scope.errorMesage = '';

        if (!invoice.discount) {
            invoice.discount = 0;
        }

        if (invoice.id) {
            getTotalPrice();

            invoiceService.saveInvoice(invoice.id, invoice.discount, Number($scope.customerId), $scope.totalPrice)
                .then(function (success) {
                    if (success.data.ok) {
                        $scope.item = success.data.content;
                        getTotalPrice();
                    } else {
                        $scope.errorMesage = success.data.content;
                    }
                }, function (error) {
                    alertError(error);
                });
        } else {
            invoiceService.createNewInvoice(invoice.discount, Number($scope.customerId), $scope.totalPrice)
                .then(function (success) {
                    if (success.data.ok) {
                        $scope.item = success.data.content;
                    } else {
                        $scope.errorMesage = success.data.content;
                    }
                }, function (error) {
                    alertError(error);
                });
        }
    }

    function removeInvoiceItem(invoiceId, itemId) {
        invoiceItemService.removeCurrentItem(invoiceId, itemId)
            .then(function (success) {
                if (success.data.ok) {
                    $scope.invoiceItems = _.filter($scope.invoiceItems, (item) => {
                        return item.id != success.data.content.id;
                    })
                } else {
                    $scope.errorMesage = success.data.content;
                }
            }, function (error) {
                alertError(error);
            });

    }

    function saveInvoiceItem(item, invoiceId) {
        $scope.errorMesage = '';

        invoiceItemService.saveInvoiceItemData(invoiceId, item.id, item.product_id, item.quantity)
            .then(function (success) {
                if (success.data.ok) {
                    $scope.invoiceItems = invoiceService.formatInvoiceItems($scope.invoiceItems, generalProducts);

                    getTotalPrice();
                } else {
                    $scope.errorMesage = success.data.content;
                }
            }, function (error) {
                alertError(error);
            });

    }

    function alertError(err) {
        dataLoadSuccess = false;
        console.error('Response error', err.status, err.data);
    }

    function saveInvoiceItems(responce) {
        if (angular.isArray(responce.data)) {
            $scope.invoiceItems = invoiceService.formatInvoiceItems(responce.data, generalProducts);
            getTotalPrice();
            updateGeneralProductList($scope.invoiceItems, $scope.products);
        }
    }

    function saveCustomers(responce) {
        if (angular.isArray(responce.data)) {
            $scope.customers = responce.data;
        }
    }

    function saveProducts(responce) {
        if (angular.isArray(responce.data)) {
            $scope.products = responce.data;
            generalProducts = responce.data;
        }
    }

    function getTotalPrice() {
        $scope.totalPrice = invoiceService.getTotalInvoicePrice($scope.invoiceItems, $scope.item.discount);
    }

    function addProduct(id, productId, quantity) {
        $scope.errorMesage = '';

        invoiceItemService.addInvoiceItems(id, Number(productId), quantity)
            .then(function (success) {
                if (success.data.ok) {
                    $scope.productId = null;
                    let newItem = invoiceService.formatInvoiceItems([success.data.content], generalProducts);

                    $scope.invoiceItems = _.concat($scope.invoiceItems, newItem);
                    getTotalPrice();
                    updateGeneralProductList($scope.invoiceItems, $scope.products);
                } else {
                    $scope.errorMesage = success.data.content;
                }
            }, function (error) {
                alertError(error);
            });
    }

    function updateGeneralProductList(invoiceItems, products) {
        $scope.products = invoiceService.getAwailableProductList(invoiceItems, products)
    }
}