let model = require('../../models');
let Invoice = model.invoice;

module.exports.deleteInvoice = async function (req, res) {
    let data = {
        ok: false
    };

    try {
        let invoice = await Invoice.findById(req.params.invoice_id);
        let removedInvoice = await invoice.destroy();

        res.json(removedInvoice);
    } catch (e) {
        console.error(e);
        res.json(data);
    }
};