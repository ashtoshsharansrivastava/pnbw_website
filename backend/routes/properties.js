const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/properties
router.get('/', async (req, res) => {
  const list = await Property.find();
  res.json(list);
});

// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  const prop = await Property.findById(req.params.id);
  res.json(prop);
});

module.exports = router;
