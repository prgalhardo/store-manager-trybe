const express = require('express');

const router = express.Router();
const Sales = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSalesMiddleware');

router.get('/', Sales.getAll);
router.get('/:id', Sales.findById);
router.post('/', 
validateSales.validateSalesMiddleware,
Sales.createNewSale);
router.put('/:id', 
validateSales.validateSalesMiddleware);

module.exports = router;