let model =  require('../../models');
let Product = model.product;

module.exports.getProduct = async function (req, res) {
    let product = await Product.findById(req.params.product_id);

    res.json(product);
};
