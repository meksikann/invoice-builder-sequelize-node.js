let model = require('../../models');
let Customer = model.customer;

module.exports.getCustomer = async function (req, res) {
    let customer = await Customer.findById(req.params.customer_id);

    res.json(customer);
};