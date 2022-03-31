const Sales = require('../models/SalesModel');

const getAll = async (req, response) => {
  const sales = await Sales.getAll();

  response.status(200).json(sales);
};

const findById = async (req, response) => {
  const { id } = req.params;

  const sales = await Sales.findById(id);

  if (!sales) return response.status(404).json({ message: 'Sale not found' });

  response.status(200).json(sales);
};

module.exports = {
  getAll,
  findById,
};