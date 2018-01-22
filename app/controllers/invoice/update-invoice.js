let model = require('../../models');
let Invoice = model.invoice;
let _ = require("lodash");

module.exports.updateInvoice = async function (req, res) {
    //TODO: make data validation !!!!!!!!!!!!!!!!

    let invoice = await Invoice.findById(req.params.invoice_id);
    let data = {};

    if(req.body.total < 1000){
        let updatedInvoice = await invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total']));
        data.ok = true;
        data.content = updatedInvoice
    } else {
        data.ok = false;
        data.content = 'Total price is too high';
    }

    res.json(data);
};