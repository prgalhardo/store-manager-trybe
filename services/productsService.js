// Agradecimento: Ronald Assis, turma 16A.

const Product = require('../models/ProductsModel');

const getAll = async () => {
  const products = await Product.getAll();

  return products;
};

const findById = async (id) => {
  const [productData] = await Product.findById(id);

  return productData;
};

const createNewProduct = async ({ name, quantity }) => {
  try {
    const newProduct = await Product.createNewProduct({ name, quantity });
    return newProduct;
  } catch (error) {
    return new Error('Product already exists');
  }
};

const updateProduct = async ({ id, name, quantity }) => {
    const verifyId = await findById(id);
    if (verifyId === undefined) throw Error('Product not found');

    await Product.updateProduct({ id, name, quantity });
    return { id, name, quantity };
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  updateProduct,
};