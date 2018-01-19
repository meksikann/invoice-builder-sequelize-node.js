let model = require('../../models');
let Invoice = model.invoice;
let _ = require("lodash");

module.exports.updateInvoice = async function (req, res) {
    let invoice = await Invoice.findById(req.params.invoice_id);
    let updatedInvoice = await invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total']));

    res.json(updatedInvoice);
};