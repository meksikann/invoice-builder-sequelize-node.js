let model = require('../../models');
let Customer = model.customer;

module.exports.getAllCustomers = async function (req, res) {
    let customers = await Customer.findAll();

    res.json(customers);
};