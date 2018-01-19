let model = require('../../models');
let InvoiceItem = model.invoiceItem;
let _ = require("lodash");

module.exports.updateInvoiceItem = async function (req, res) {
    let invoiceItem = await InvoiceItem.findOne({where:{id: req.params.id, invoice_id: req.params.invoice_id}});
    let updatedInvoice = await invoiceItem.update(_.pick(req.body, ['invoice_id', 'product_id', 'quantity']));

    res.json(updatedInvoice);
};