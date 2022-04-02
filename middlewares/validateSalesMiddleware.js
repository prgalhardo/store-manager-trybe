const error = (status, message) => ({ status, message });

// O retorno é um array, vai ser necessário fazer um forEach():

const validateProductId = async (productId) => {
  if (!productId) throw error(400, '"productId" is required');
};

const validateQuantity = (quantityOfSale) => {
  if (quantityOfSale === undefined) throw error(400, '"quantity" is required');
  if (quantityOfSale <= 0) throw error(422, '"quantity" must be greater than or equal to 1');
};

const validateSalesMiddleware = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    validateProductId(productId);
    validateQuantity(quantity);
    next();
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  validateSalesMiddleware,
};