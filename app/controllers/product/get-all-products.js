let model =  require('../../models');
let Product = model.product;

module.exports.getAllProducts = async function (req, res) {
    let products = await Product.findAll();

    res.json(products);
};
