(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name invoiceItemService
     * @description manipulate invoice item data
     */

    angular
        .module('app.models.InvoiceModel')
        .factory('invoiceItemService', invoiceItemService);

    invoiceItemService.$inject = [
        '$http'
    ];

    function invoiceItemService($http) {
        let service = {
            addInvoiceItems: addInvoiceItems,
            saveInvoiceItemData: saveInvoiceItemData,
            removeCurrentItem: removeCurrentItem
        };

        return service;

        /**
         * @name getInvoiceItems
         * @param {number} id
         * @param {number} productId
         * @param {number}quantity
         * @description gets comment author data
         */
        function addInvoiceItems(id, productId, quantity) {
            return $http({
                method: 'POST',
                url: '/api/invoices/'+id+'/items',
                data: {
                    invoice_id: id,
                    product_id: productId,
                    quantity: quantity
                }
            })
        }

        function saveInvoiceItemData(id, itemId, productId, quantity) {
            return $http({
                method: 'PUT',
                url: '/api/invoices/'+id+'/items/'+itemId,
                data: {
                    invoice_id: id,
                    product_id: productId,
                    quantity: quantity
                }
            })
        }

        function removeCurrentItem(invoiceId, itemId) {
            return $http({
                method: 'DELETE',
                url: '/api/invoices/'+invoiceId+'/items/'+itemId,
                data: {
                    invoice_id: Number(invoiceId),
                    id: Number(itemId)
                }
            })
        }


    }
})();