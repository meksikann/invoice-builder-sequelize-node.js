let model = require('../../models');
let _ = require("lodash");
let Invoice = model.invoice;

module.exports.createInvoice = async function (req, res) {
    let data = {
        ok: false
    };

    try {
        let invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
        let savedInvoice = await invoice.save();

        data.ok = true;
        data.content = savedInvoice;

        res.json(data);
    } catch (e) {
        console.error(e);
        res.json(data);
    }
};