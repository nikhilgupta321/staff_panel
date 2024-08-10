const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const itemEmployees = require('../controller/employee.controller');


// Get all items
// router.route('/items').get(itemController.getAllItems)
router.route('/employee').get(itemEmployees.getAllEmployees);

// Get a specific item by ID
router.get('/employee/:id', itemEmployees.getEmployeeById);

// Add a new item
router.post('/employee', itemEmployees.addEmployee);

// Update an item
router.put('/employee/:id', itemEmployees.updateEmployee);

// Delete an item
router.delete('/employee/:id', itemEmployees.deleteEmployee);

module.exports = router;
