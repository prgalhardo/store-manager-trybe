const error = (status, message) => ({ status, message });

const validateProductId = (productId) => {
  if (!productId) throw error(400, '"productId" is required');
};

const validateQuantity = (quantityOfSale) => {
  if (quantityOfSale === undefined) throw error(400, '"quantity" is required');
  if (Number(quantityOfSale) <= 0) {
    throw error(422, '"quantity" must be greater than or equal to 1');
  }
};

const validateSalesMiddleware = (req, res, next) => {
  // Agradecimento Brunão e Pedro Mendes, turma 16A.
  const { body } = req;
  body.forEach(({ productId, quantity }) => {
    try {
      validateProductId(productId);
      validateQuantity(quantity);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  });
  next();
};

module.exports = {
  validateSalesMiddleware,
};