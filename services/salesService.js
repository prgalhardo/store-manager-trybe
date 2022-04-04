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
    const newSale = await Sale.createNewSale(sales);
    return newSale;
};

const updateSale = async (saleId, sales) => {
  const saleUpdate = await Sale.updateSale(saleId, sales);
  return saleUpdate;
};

module.exports = {
  getAll,
  findById,
  createNewSale,
  updateSale,
};