let _ = require("lodash");
let model =  require('../../models');
let Product = model.product;

module.exports.updateProduct = async function (req, res) {
    let product = await Product.findById(req.params.product_id);
    let updatedProduct = await product.update(_.pick(req.body, ['name', 'price']));

    res.json(updatedProduct);
};
