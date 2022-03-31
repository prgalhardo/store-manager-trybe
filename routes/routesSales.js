const express = require('express');

const router = express.Router();
const Sales = require('../controllers/salesController');

router.get('/', Sales.getAll);
router.get('/:id', Sales.findById);

module.exports = router;