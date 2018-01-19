let model = require('../../models');
let _ = require("lodash");
let Invoice = model.invoice;

module.exports.createInvoice = async function (req, res) {
    let invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
    let savedInvoice = await invoice.save();

    res.json(savedInvoice);
};