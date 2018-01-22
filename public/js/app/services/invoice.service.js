(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name invoiceService
     * @description manipulate invoice data
     */

    angular
        .module('app.models.InvoiceModel')
        .factory('invoiceService', invoiceService);

    invoiceService.$inject = [
        '$http'
    ];

    function invoiceService($http) {
        let NO_NAME_FOUND = 'no name found';
        let service = {
            getInvoiceItems: getInvoiceItems,
            getProducts: getProducts,
            getCustomers: getCustomers,
            getFullPrice: getFullPrice,
            getProductName: getProductName,
            formatInvoiceItems: formatInvoiceItems,
            createNewInvoice: createNewInvoice,
            saveInvoice: saveInvoice,
            getTotalInvoicePrice: getTotalInvoicePrice,
            getAwailableProductList: getAwailableProductList
        };

        return service;

        /**
         * @name getInvoiceItems
         * @param {number} id
         * @description gets comment author data
         */
        function getInvoiceItems(id) {
            return $http({
                method: 'GET',
                url: '/api/invoices/'+id+'/items',
                params:{
                    id:id
                }
            })
        }

        function getProducts() {
            return $http({
                method: 'GET',
                url: '/api/products'
            })
        }

        function getCustomers() {
            return $http({
                method: 'GET',
                url: '/api/customers'
            })
        }

        function createNewInvoice(discount, customerId, totalPrice) {
            return $http({
                method: 'POST',
                url: '/api/invoices',
                data: {
                    customer_id: customerId,
                    discount: discount,
                    total: totalPrice
                }
            })
        }

        function saveInvoice(invoiceId, discount, customerId, totalPrice) {
            return $http({
                method: 'PUT',
                url: '/api/invoices/'+invoiceId,
                data: {
                    customer_id: customerId,
                    discount: discount,
                    total: totalPrice
                }
            })
        }

        function getTotalInvoicePrice(items, discount) {
            let totalPrice = 0;
            let calculatedPrice;

            _.forEach(items,(item)=>{
                totalPrice = totalPrice + Number(item.total_price);
            });

            calculatedPrice = totalPrice - (totalPrice*discount)/100;
            return calculatedPrice.toFixed(2);
        }

        function getFullPrice(productId, amount, products) {
            let product = _.find(products, ['id', productId]);

            if (product) {
                return (product.price * amount).toFixed(2);
            }
        }
        function getProductName(productId, products) {
            let product = _.find(products, ['id', productId]);

            if (product) {
                return product.name;
            } else {
                return NO_NAME_FOUND
            }
        }

        function formatInvoiceItems(items, products) {
            return items.map(function (item) {
                item.name = getProductName(item.product_id, products);
                item.total_price = getFullPrice(item.product_id, item.quantity, products);
                return item;
            })
        }

        function getAwailableProductList(items, products) {
            return _.filter(products, (product)=>{
                let usedProduct =  _.find(items, ['product_id', product.id]);

                return !usedProduct;

            })
        }
    }
})();