let model = require('../../models');
let Customer = model.customer;
let _ = require("lodash");

module.exports.updateCustomer = async function (req, res) {
    let customer = await Customer.findById(req.params.customer_id);
    let updatedCustomer = await customer.update(_.pick(req.body, ['name', 'address', 'phone']));

    res.json(updatedCustomer);
};