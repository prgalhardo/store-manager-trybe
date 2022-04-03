const error = (status, message) => ({ status, message });

const validateProductId = (productId) => {
  console.log(productId);
  if (!productId) throw error(400, '"productId" is required');
};

const validateQuantity = (quantityOfSale) => {
  console.log(quantityOfSale);
  if (quantityOfSale === undefined) throw error(400, '"quantity" is required');
  if (Number(quantityOfSale) <= 0) {
    throw error(422, '"quantity" must be greater than or equal to 1');
  }
};

const validateSalesMiddleware = (req, res, next) => {
  const { body } = req;
  body.forEach(({ productId, quantity }) => {
    try {
      validateProductId(productId);
      validateQuantity(quantity);
      next();
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  });
};

module.exports = {
  validateSalesMiddleware,
};