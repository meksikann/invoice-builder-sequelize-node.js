let model = require('../../models');
let Invoice = model.invoice;

module.exports.getAllInvoices = async function (req, res) {
    let invoices  = await Invoice.findAll();

    res.json(invoices);
};