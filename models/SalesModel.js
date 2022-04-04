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

const createNewSale = async (sales) => {
  const [queryOfSales] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  const queryOfSalesProduct = `INSERT INTO sales_products
   (sale_id, product_id, quantity) VALUES (?,?,?)`;
   // Agradecimento a Pedro Mendes, turma 16A.
  // O map no connection vai criar um array de promises.
  const allSales = sales.map(({ productId, quantity }) =>
    connection.execute(queryOfSalesProduct, [
      queryOfSales.insertId,
      productId,
      quantity,
    ]));
  // Promise.all é uma função que vai pegar um array de promises e executar.
  await Promise.all(allSales);
  return { id: queryOfSales.insertId, itemsSold: sales };
};

const updateSale = async (saleId, sales) => {
  const queryOfUpdateSale = `UPDATE sales_products
   SET quantity=? WHERE sale_id=? AND product_id=?`;
  const saleUpdate = sales.map(({ productId, quantity }) => 
    connection.execute(queryOfUpdateSale, [quantity, saleId, productId]));
  await Promise.all(saleUpdate);
  return { saleId, itemUpdated: sales };
};

module.exports = {
  getAll,
  findById,
  createNewSale,
  updateSale,
};
