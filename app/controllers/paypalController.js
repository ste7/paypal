const paypal = require('paypal-rest-sdk');


var payment = {
    product: null,
    price: null,
    quantity: 1
};


exports.get_paypal = function (req, res, next) {
    res.render('payment/paypal');
};


exports.post_create_payment = function (req, res, next) {

    payment.product = req.body.product;
    payment.price = req.body.price;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/paypal/success",
            "cancel_url": "http://localhost:8080/paypal/cansel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": payment.product,
                    "sku": "001",
                    "price": payment.price,
                    "currency": "USD",
                    "quantity": payment.quantity
                }]
            },
            "amount": {
                "currency": "USD",
                "total": payment.price * payment.quantity
            },
            "description": "PayPal payment"
        }]
    };


    paypal.payment.create(create_payment_json, function (error, response) {
        if (error) {
            throw error;
        } else {
            res.json(response);
        }
    });
};


exports.get_success = function (req, res, next) {

    var paymentId = req.query.paymentId;
    var payerId = req.query.PayerID;


    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": payment.price * payment.quantity
            }
        }]
    };


    paypal.payment.execute(paymentId, execute_payment_json, function (error, response) {
        if (error) {
            throw error;
        } else {
            res.json(response);
        }
    });
};