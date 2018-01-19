let model = require('../../models');
let Invoice = model.invoice;

module.exports.getInvoice = async function (req, res) {
    let invoice = await Invoice.findById(req.params.invoice_id);

    res.json(invoice);
};