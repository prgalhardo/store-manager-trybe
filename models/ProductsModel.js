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

module.exports = {
  getAll,
  findById,
};
