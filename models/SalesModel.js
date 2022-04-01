const connection = require('../config/connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId,
    sp.quantity from sales_products AS sp INNER JOIN sales AS s ON sp.sale_id = s.id 
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return sales;
};

const findById = async (id) => {
  const query = `SELECT s.date AS date, sp.product_id AS productId,
  sp.quantity from sales_products AS sp INNER JOIN sales AS s ON sp.sale_id = s.id WHERE id=?
   ORDER BY sp.sale_id, sp.product_id;`;
  const [saleData] = await connection.execute(query, [id]);

  return saleData;
};

module.exports = {
  getAll,
  findById,
};
