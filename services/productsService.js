// Agradecimento: Ronald Assis, turma 16A.

const Product = require('../models/ProductsModel');

const getAll = async () => {
  const products = await Product.getAll();

  return products;
};

const findById = async (id) => {
  const productData = await Product.findById(id);

  return productData;
};

module.exports = {
  getAll,
  findById,
};