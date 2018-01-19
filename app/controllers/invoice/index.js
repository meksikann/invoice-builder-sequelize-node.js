let _ = require("lodash");
let createInvoice = require('./create-invoice');
let getAllInvoices = require('./get-all-invoices');
let deleteInvoice = require('./delete-invoice');
let getInvoice = require('./get-invoice');
let updateInvoice = require('./update-invoice');

module.exports = _.merge({}, createInvoice, getAllInvoices, deleteInvoice, getInvoice, updateInvoice);