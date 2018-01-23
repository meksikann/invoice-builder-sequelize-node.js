let model = require('../../models');
let Invoice = model.invoice;

module.exports.getInvoice = async function (req, res) {
    try {
        let invoice = await Invoice.findById(req.params.invoice_id);

        res.json(invoice);
    } catch (e) {
        console.error(e);
        res.json(e);
    }
};