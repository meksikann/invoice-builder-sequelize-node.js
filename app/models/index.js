let Sequelize = require('sequelize');
let path = require('path');

sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'invoices.sqlite')
});

let Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
});

let Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    }
});

let Invoice = sequelize.define('invoices', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: Sequelize.INTEGER
    },
    discount: {
        type: Sequelize.DECIMAL
    },
    total: {
        type: Sequelize.DECIMAL
    }
});

let InvoiceItem = sequelize.define('invoice_items', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    invoice_id: {
        type: Sequelize.INTEGER
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.DECIMAL
    }
});

sequelize.sync().then(function () {
    createData()

}).catch(function (e) {
    console.log("ERROR SYNCING WITH DB", e);
});

async function createData() {
    Customer.create({
        name: "Bob Smith",
        address: "215 Market St, Dansville CA 94325",
        phone: "555-534-2342"
    });

    Customer.create({
        name: "John Draper",
        address: "890 Main St, Fontana IL 31450",
        phone: "555-534-2342"
    });

    Product.create({
        name: "Phone Holder",
        price: 9.99
    });

    Product.create({
        name: "Pet Rock",
        price: 5.99
    });

    Product.create({
        name: "Egg Timer",
        price: 15.99
    });

    Product.create({
        name: "Neon Green Hat",
        price: 21.99
    });

    let customer_1 = await Customer.create({
        name: "Mark Benson",
        address: "353 Rochester St, Rialto FL 43250",
        phone: "555-534-2342"
    });

    let product_1 = await Product.create({
        name: "Parachute Pants",
        price: 29.99
    });

    let invoice_1 = await Invoice.create({
        customer_id: customer_1.get('id'),
        discount: 10.00,
        total: 20.00
    });

    let invoice_2 = await Invoice.create({
        customer_id: customer_1.get('id'),
        discount: 20.00,
        total: 3.00
    });

    InvoiceItem.create({
        invoice_id: invoice_1.get('id'),
        product_id: product_1.get('id'),
        quantity: 5
    });

    InvoiceItem.create({
        invoice_id: invoice_2.get('id'),
        product_id: product_1.get('id'),
        quantity: 5
    });
}

module.exports.customer = Customer;
module.exports.product = Product;
module.exports.invoice = Invoice;
module.exports.invoiceItem = InvoiceItem;
