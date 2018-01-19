let model = require('../../models');
let Invoice = model.invoice;

module.exports.deleteInvoice = async function (req, res) {
    let invoice = await Invoice.findById(req.params.invoice_id);
    let removedInvoice = await invoice.destroy();

    res.json(removedInvoice);
};