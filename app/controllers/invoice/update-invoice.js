let model = require('../../models');
let Invoice = model.invoice;
let _ = require("lodash");

module.exports.updateInvoice = async function (req, res) {
    let data = {
        ok:false
    };

    try{
        let invoice = await Invoice.findById(req.params.invoice_id);
        let updatedInvoice = await invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total']));

        data.ok = true;
        data.content = updatedInvoice;

        res.json(data);
    }catch (e){
        console.error(e);
        res.json(data);
    }
};