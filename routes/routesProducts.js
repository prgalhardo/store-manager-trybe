const express = require('express');

const router = express.Router();
const Products = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProductsMiddleware');

router.get('/', Products.getAll);
router.get('/:id', Products.findById);
router.post('/', validateProducts.validateProductsMiddleware, validateProducts.validateEqualNames);
router.put('/:id', 
  validateProducts.validateProductsMiddleware, validateProducts.validateEqualNames);

module.exports = router;