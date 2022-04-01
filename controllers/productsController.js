const Products = require('../services/productsService');

const getAll = async (req, response) => {
  const products = await Products.getAll();

  response.status(200).json(products);
};

const findById = async (req, response) => {
  const { id } = req.params;

  const products = await Products.findById(id);

  if (products === undefined || products.length === 0) {
    return response.status(404).json({ message: 'Product not found' });
  }

  response.status(200).json(products);
};

module.exports = {
  getAll,
  findById,
};