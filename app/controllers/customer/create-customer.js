let model = require('../../models');
let _ = require("lodash");
let Customer = model.customer;

module.exports.createCustomer = async function (req, res) {
    let customer = Customer.build(_.pick(req.body, ['name', 'address', 'phone']));
    let savedCustomer = await customer.save();

    res.json(savedCustomer);
};