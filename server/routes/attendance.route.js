const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const itemAttendance = require('../controller/attendance.controller');


// Get all items
// router.route('/items').get(itemController.getAllItems)
router.route('/attendance').get(itemAttendance.getAllAttendances);

// Get a specific item by ID
router.get('/attendance/:id', itemAttendance.getAttendanceById);

// Add a new item
router.post('/attendance', itemAttendance.addAttendance);

// Update an item
router.put('/attendance/:id', itemAttendance.updateAttendance);

// Delete an item
router.delete('/attendance/:id', itemAttendance.deleteAttendance);

module.exports = router;
