let model = require('../../models');
let InvoiceItem = model.invoiceItem;

module.exports.deleteInvoiceItem = async function (req, res) {
    //TODO: validations
    let data = {};
    let invoiceItem = await InvoiceItem.findOne({where:{id: req.params.id, invoice_id: req.params.invoice_id}});

    if(invoiceItem){
        var removedInvoiceItem = await invoiceItem.destroy();

    }


    if(removedInvoiceItem){
        data.ok = true;
        data.content = removedInvoiceItem;
    } else {
        data.ok = false;
    }

    res.json(data);
};