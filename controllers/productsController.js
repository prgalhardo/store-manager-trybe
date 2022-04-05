const Products = require('../services/productsService');

const getAll = async (req, response) => {
  const products = await Products.getAll();

  response.status(200).json(products);
};0

const findById = async (req, response) => {
  const { id } = req.params;

  const products = await Products.findById(id);

  if (products === undefined || products.length === 0) {
    return response.status(404).json({ message: 'Product not found' });
  }

  response.status(200).json(products);
};

const createNewProduct = async (req, response) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await Products.createNewProduct({ name, quantity });
    return response.status(201).json(newProduct);
  } catch (err) {
    return response.status(409).json({ message: err.message });
  } 
};

const updateProduct = async (req, response) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productUpdate = await Products.updateProduct({ id, name, quantity });
    return response.status(200).json(productUpdate);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

const deleteProduct = async (req, response) => {
  try {
    const { id } = req.params;
    const productDeleted = await Products.deleteProduct(id);
    return response.status(204).json(productDeleted);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};