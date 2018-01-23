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
            req.checkBody('name', 'Name should exist').exists();
            req.checkBody('name', 'Name should have min length:1').isLength({min: 1});

            let errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            customerController.createCustomer(req, res);
        });

    app.route('/api/customers/:customer_id')
        .get(function (req, res) {
            let errors;

            req.checkParams('customer_id', 'customer_id should exist').exists();
            req.checkParams('customer_id', 'customer_id should be a number').isNumeric();
            req.checkParams('customer_id', 'customer_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            customerController.getCustomer(req, res);
        })
        .put(function (req, res) {
            let errors;

            req.checkParams('customer_id', 'customer_id should exist').exists();
            req.checkParams('customer_id', 'customer_id should be a number').isNumeric();
            req.checkParams('customer_id', 'customer_id should have min length:1').isLength({min: 1});
            req.checkBody('name', 'name should exist').exists();

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            customerController.updateCustomer(req, res);
        })
        .delete(function (req, res) {
            let errors;

            req.checkParams('customer_id', 'customer_id should exist').exists();
            req.checkParams('customer_id', 'customer_id should be a number').isNumeric();
            req.checkParams('customer_id', 'customer_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            customerController.deleteCustomer(req, res);
        });

// PRODUCTS API

    app.route('/api/products')
        .get(function (req, res) {
            productController.getAllProducts(req, res);
        })
        .post(function (req, res) {
            let errors;

            req.checkBody('name', 'name should exist').exists();
            req.checkBody('price', 'price should exist').exists();

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            productController.createProduct(req, res);
        });

    app.route('/api/products/:product_id')
        .get(function (req, res) {
            let errors;

            req.checkParams('product_id', 'product_id should exist').exists();
            req.checkParams('product_id', 'product_id should be a number').isNumeric();
            req.checkParams('product_id', 'product_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            productController.getProduct(req, res);
        })
        .put(function (req, res) {
            let errors;

            req.checkParams('product_id', 'product_id should exist').exists();
            req.checkParams('product_id', 'product_id should be a number').isNumeric();
            req.checkParams('product_id', 'product_id should have min length:1').isLength({min: 1});
            req.checkBody('name', 'name should exist').exists();
            req.checkBody('price', 'price should exist').exists();

            errors = req.validationErrors();
            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            productController.updateProduct(req, res);
        })
        .delete(function (req, res) {
            let errors;

            req.checkParams('product_id', 'product_id should exist').exists();
            req.checkParams('product_id', 'product_id should be a number').isNumeric();
            req.checkParams('product_id', 'product_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();
            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }
            productController.deleteProduct(req, res);
        });


// INVOICES API

    app.route('/api/invoices')
        .get(function (req, res) {
            invoiceController.getAllInvoices(req, res)
        })
        .post(function (req, res) {
            let errors;

            req.checkBody('customer_id', 'customer_id should exist').exists();
            req.checkBody('customer_id', 'customer_id should be a number').isNumeric();
            req.checkBody('customer_id', 'customer_id should have min length:1').isLength({min: 1});
            req.checkBody('total', 'total should exist').exists();
            req.checkBody('total', 'total should be a number').isNumeric();
            req.checkBody('total', 'total should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceController.createInvoice(req, res)
        });

    app.route('/api/invoices/:invoice_id')
        .get(function (req, res) {
            let errors;

            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceController.getInvoice(req, res)
        })
        .put(function (req, res) {
            let errors;

            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            req.checkBody('customer_id', 'customer_id should exist').exists();
            req.checkBody('customer_id', 'customer_id should be a number').isNumeric();
            req.checkBody('customer_id', 'customer_id should have min length:1').isLength({min: 1});

            req.checkBody('total', 'total should exist').exists();
            req.checkBody('total', 'total should have min length:1').isLength({min: 1});
            req.checkBody('discount', 'discount should exist').exists();
            req.checkBody('discount', 'discount should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceController.updateInvoice(req, res)
        })
        .delete(function (req, res) {
            let errors;

            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }
            invoiceController.deleteInvoice(req, res)
        });


// INVOICE ITEMS API

    app.route('/api/invoices/:invoice_id/items')
        .get(function (req, res) {
            let errors;

            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceItemController.getAllInvoiceItems(req, res);
        })
        .post(function (req, res) {
            let errors;

            req.checkBody('invoice_id', 'invoice_id should exist').exists();
            req.checkBody('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkBody('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});
            req.checkBody('product_id', 'product_id should exist').exists();
            req.checkBody('product_id', 'product_id should be a number').isNumeric();
            req.checkBody('product_id', 'product_id should have min length:1').isLength({min: 1});
            req.checkBody('quantity', 'quantity should exist').exists();
            req.checkBody('quantity', 'quantity should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceItemController.createInvoiceItem(req, res);
        });

    app.route('/api/invoices/:invoice_id/items/:id')
        .get(function (req, res) {
            let errors;

            req.checkParams('id', 'id should exist').exists();
            req.checkParams('id', 'id should be a number').isNumeric();
            req.checkParams('id', 'id should have min length:1').isLength({min: 1});
            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceItemController.getInvoiceItem(req, res);
        })
        .put(function (req, res) {
            let errors;

            req.checkParams('id', 'id should exist').exists();
            req.checkParams('id', 'id should be a number').isNumeric();
            req.checkParams('id', 'id should have min length:1').isLength({min: 1});
            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});
            req.checkBody('invoice_id', 'invoice_id should exist').exists();
            req.checkBody('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkBody('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});
            req.checkBody('product_id', 'product_id should exist').exists();
            req.checkBody('product_id', 'product_id should be a number').isNumeric();
            req.checkBody('product_id', 'product_id should have min length:1').isLength({min: 1});
            req.checkBody('quantity', 'quantity should exist').exists();
            req.checkBody('quantity', 'quantity should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceItemController.updateInvoiceItem(req, res);
        })
        .delete(function (req, res) {
            let errors;

            req.checkParams('id', 'id should exist').exists();
            req.checkParams('id', 'id should be a number').isNumeric();
            req.checkParams('id', 'id should have min length:1').isLength({min: 1});
            req.checkParams('invoice_id', 'invoice_id should exist').exists();
            req.checkParams('invoice_id', 'invoice_id should be a number').isNumeric();
            req.checkParams('invoice_id', 'invoice_id should have min length:1').isLength({min: 1});

            errors = req.validationErrors();

            if (errors) {
                console.error(errors);
                res.send(errors);
                return;
            }

            invoiceItemController.deleteInvoiceItem(req, res);
        });
};