const connection = require('../config/connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT s.sale_id AS saleId, date, s.product_id AS productId,
    s.quantity from sales_products AS s INNER JOIN sales ON s.sale_id = sales.id;`,
  );
  return sales;
};

const findById = async (id) => {
  const query = `SELECT date, s.product_id AS productId,
  s.quantity from sales_products AS s INNER JOIN sales ON s.sale_id = sales.id WHERE id=?;`;
  const [saleData] = await connection.execute(query, [id]);

  return saleData[0];
};

module.exports = {
  getAll,
  findById,
};
