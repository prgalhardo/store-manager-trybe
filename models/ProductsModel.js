const connection = require('../config/connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name, quantity FROM products;',
  );
  return products;
};

const findById = async (id) => {
  const query = 'SELECT id, name, quantity FROM products WHERE id=?;';
  const [productData] = await connection.execute(query, [id]);

  return productData;
};

const createNewProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?);';
  const [newProduct] = await connection.execute(query, [name, quantity]);
  return { id: newProduct.insertId, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  await connection
  .execute('UPDATE products SET name=?, quantity=? WHERE id=?', [id, name, quantity]);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id=?;';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
