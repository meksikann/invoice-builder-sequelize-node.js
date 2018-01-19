let model = require('../models');
let Customer = model.customer;
let Product = model.product;
let customerController = require('../controllers/customer');
let productController = require('../controllers/product');
let invoiceController = require('../controllers/invoice');
let invoiceItemController = require('../controllers/invoice-item');
let _ = require("lodash");

module.exports = function (app) {

// Redirect all non api requests to the index
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.route('/api/customers')
        .get(function (req, res) {
            customerController.getAllCustomers(req, res);
        })
        .post(function (req, res) {
            customerController.createCustomer(req, res);
        });

    app.route('/api/customers/:customer_id')
        .get(function (req, res) {
            customerController.getCustomer(req, res);
        })
        .put(function (req, res) {
            customerController.updateCustomer(req, res);
        })
        .delete(function (req, res) {
            customerController.deleteCustomer(req, res);
        });

// PRODUCTS API

    app.route('/api/products')
        .get(function (req, res) {
            productController.getAllProducts(req, res);
        })
        .post(function (req, res) {
            productController.createProduct(req, res);
        });

    app.route('/api/products/:product_id')
        .get(function (req, res) {
            productController.getProduct(req, res);
        })
        .put(function (req, res) {
            productController.updateProduct(req, res);
        })
        .delete(function (req, res) {
            productController.deleteProduct(req, res);
        });


// INVOICES API

    app.route('/api/invoices')
        .get(function (req, res) {
            invoiceController.getAllInvoices(req, res)
        })
        .post(function (req, res) {
            invoiceController.createInvoice(req, res)
        });

    app.route('/api/invoices/:invoice_id')
        .get(function (req, res) {
            invoiceController.getInvoice(req, res)
        })
        .put(function (req, res) {
            invoiceController.updateInvoice(req, res)
        })
        .delete(function (req, res) {
            invoiceController.deleteInvoice(req, res)
        });


// INVOICE ITEMS API

    app.route('/api/invoices/:invoice_id/items')
        .get(function (req, res) {
            invoiceItemController.getAllInvoiceItems(req, res);
        })
        .post(function (req, res) {
            invoiceItemController.createInvoiceItem(req, res);
        });

    app.route('/api/invoices/:invoice_id/items/:id')
        .get(function (req, res) {
            invoiceItemController.getInvoiceItem(req, res);
        })
        .put(function (req, res) {
            invoiceItemController.updateInvoiceItem(req, res);
        })
        .delete(function (req, res) {
            invoiceItemController.deleteInvoiceItem(req, res);
        });
};