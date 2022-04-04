const Sales = require('../services/salesService');

const getAll = async (req, response) => {
  const sales = await Sales.getAll();

  response.status(200).json(sales);
};

const findById = async (req, response) => {
  const { id } = req.params;

  const sales = await Sales.findById(id);

  if (sales.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }

  response.status(200).json(sales);
};

const createNewSale = async (req, response) => {
    const newSale = await Sales.createNewSale(req.body);
    return response.status(201).json(newSale);
};

const updateSale = async (req, response) => {
  const saleUpdate = await Sales.updateSale(req.params.id, req.body);
  return response.status(200).json(saleUpdate);
};

module.exports = {
  getAll,
  findById,
  createNewSale,
  updateSale,
};