const Sale = require('../models/SalesModel');

const getAll = async () => {
  const sales = await Sale.getAll();

  return sales;
};

const findById = async (id) => {
  const saleData = await Sale.findById(id);

  return saleData;
};
module.exports = {
  getAll,
  findById,
};