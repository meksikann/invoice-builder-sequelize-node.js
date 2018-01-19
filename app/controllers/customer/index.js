let _ = require("lodash");
let getAllCustomers = require('./get-all-customers');
let createCustomer = require('./create-customer');
let getCustomer = require('./get-customer');
let updateCustomer = require('./update-customer');
let deleteCustomer = require('./delete-customer');


module.exports = _.merge({}, getAllCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer);