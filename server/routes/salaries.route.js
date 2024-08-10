const express = require('express');
const router = express.Router();
const itemSalaries = require('../controller/salaries.controller');


// Get all items
// router.route('/items').get(itemController.getAllItems)
router.route('/salary').get(itemSalaries.getAllSalaries);

// Get a specific item by ID
router.get('/salary/:id', itemSalaries.getSalariesById);

// Add a new item
router.post('/salary', itemSalaries.addSalary);

// Update an item
router.put('/salary/:id', itemSalaries.updateSalary);

// Delete an item
router.delete('/salary/:id', itemSalaries.deleteSalary);

module.exports = router;
