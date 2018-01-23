let model = require('../../models');
let InvoiceItem = model.invoiceItem;

module.exports.getAllInvoiceItems = async function (req, res) {
    try {
        let invoicesItems = await InvoiceItem.findAll({where: {invoice_id: req.params.invoice_id}});

        res.json(invoicesItems);
    } catch (e) {
        console.error(e);
        res.json(e);
    }
};