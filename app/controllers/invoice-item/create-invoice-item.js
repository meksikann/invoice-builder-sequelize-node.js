let model = require('../../models');
let _ = require("lodash");
let InvoiceItem = model.invoiceItem;

module.exports.createInvoiceItem = async function (req, res) {
    let invoiceItem = InvoiceItem.build(_.pick(req.body, ['invoice_id', 'product_id', 'quantity']));
    let savedInvoiceItem = await invoiceItem.save();

    res.json(savedInvoiceItem);
};