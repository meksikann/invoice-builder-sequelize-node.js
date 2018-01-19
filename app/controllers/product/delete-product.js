let model =  require('../../models');
let Product = model.product;

module.exports.deleteProduct = async function (req, res) {
    let product = await Product.findById(req.params.product_id);
    let removedProduct = await product.destroy();

    res.json(removedProduct);
};
