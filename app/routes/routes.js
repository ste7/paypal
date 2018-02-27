const express = require('express');
const router = express.Router();


const paypalController = require('../controllers/paypalController.js');



router.get('/', paypalController.get_paypal);
router.post('/paypal/create-payment', paypalController.post_create_payment);
router.post('/paypal/success', paypalController.get_success);



module.exports = router;