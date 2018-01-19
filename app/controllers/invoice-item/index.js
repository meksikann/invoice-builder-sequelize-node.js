let _ = require("lodash");
let getAllInvoiceItems = require('./get-all-invoice-items');
let createInvoiceItem = require('./create-invoice-item');
let deleteInvoiceItem = require('./delete-invoice-item');
let getInvoiceItem = require('./get-invoice-item');
let updateInvoiceItem = require('./update-invoice-item');


module.exports = _.merge({}, getAllInvoiceItems, createInvoiceItem, deleteInvoiceItem, getInvoiceItem, updateInvoiceItem);