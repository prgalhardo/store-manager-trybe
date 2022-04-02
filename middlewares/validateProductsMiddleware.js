const modelProducts = require('../models/ProductsModel');

const error = (status, message) => ({ status, message });

const validateName = (nameOfProduct) => {
  if (!nameOfProduct) throw error(400, '"name" is required');
  if (nameOfProduct.length <= 5) {
    throw error(422, '"name" length must be at least 5 characters long');
  }
};

const validateQuantity = (quantityOfProduct) => {
  if (quantityOfProduct === undefined) throw error(400, '"quantity" is required');
  if (quantityOfProduct <= 0) throw error(422, '"quantity" must be greater than or equal to 1');
};

const validateProductsMiddleware = async (req, res, next) => {
  const { name, quantity } = req.body;

  try {
    validateName(name);
    validateQuantity(quantity);
    next();
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const validateEqualNames = async (req, res, next) => {
  const { body } = req;
  const products = await modelProducts.getAll();
  const findByName = products.find((product) => product.name === body.name);
   if (findByName) return res.status(409).json({ message: 'Product already exists' });

  next();
};

module.exports = {
  validateProductsMiddleware,
  validateEqualNames,
};