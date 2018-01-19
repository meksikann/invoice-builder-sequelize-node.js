let model = require('../../models');
let Customer = model.customer;

module.exports.deleteCustomer = async function (req, res) {
    let customer = await Customer.findById(req.params.customer_id);
    let removedCustomer = await customer.destroy();

    res.json(removedCustomer);
};