let model = require('../../models');
let Invoice = model.invoice;

module.exports.getAllInvoices = async function (req, res) {
    try {
        let invoices = await Invoice.findAll();

        res.json(invoices);
    } catch (e) {
        console.error(e);
        res.json({ok: false});
    }
};