const Sale = require('../models/SalesModel');

const getAll = async () => {
  const sales = await Sale.getAll();

  return sales;
};

const findById = async (id) => {
  const saleData = await Sale.findById(id);

  return saleData;
};

const createNewSale = async (sales) => {
  try {
    const newSale = await Sale.createNewSale(sales);
    return newSale;
  } catch (error) {
    return new Error({ message: 'Sale not found' });
  }
};

module.exports = {
  getAll,
  findById,
  createNewSale,
};