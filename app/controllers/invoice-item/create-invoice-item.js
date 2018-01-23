let model = require('../../models');
let _ = require("lodash");
let InvoiceItem = model.invoiceItem;

module.exports.createInvoiceItem = async function (req, res) {
    let data = {
        ok: false
    };

    try {
        let invoiceItem = InvoiceItem.build(_.pick(req.body, ['invoice_id', 'product_id', 'quantity']));
        let savedInvoiceItem = await invoiceItem.save();

        if (savedInvoiceItem) {
            data.ok = true;
            data.content = savedInvoiceItem;
        } else {
            data.ok = false;
        }

        res.json(data);
    } catch (e) {
        console.error(e);
        res.json(data);
    }
};