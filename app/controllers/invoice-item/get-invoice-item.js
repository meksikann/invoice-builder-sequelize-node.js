let model = require('../../models');
let InvoiceItem = model.invoiceItem;

module.exports.getInvoiceItem = async function (req, res) {
    let invoiceItem = await InvoiceItem.findOne({where:{id: req.params.id, invoice_id: req.params.invoice_id}});

    res.json(invoiceItem);
};