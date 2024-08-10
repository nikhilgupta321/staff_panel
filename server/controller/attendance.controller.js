const Attendance = require('../model/attendance.model');

// Get all items
const getAllAttendances = async (req, res) => {
  try {
    const items = await Attendance.findAll();
    res.json(items);
  } catch (err) {
    console.error('Error in getAllItems:', err);
    console.error(err.stack);  // Log the stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get a specific item by ID
const getAttendanceById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Attendance.findByPk(itemId);
    res.json(item);
  } catch (err) {
    console.error(`Error in getItemById for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new item
const addAttendance = async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await Attendance.create(newItem);
    res.json(createdItem);
  } catch (err) {
    console.error('Error in addItem:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an item  
const updateAttendance = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    await Attendance.update(updatedItem, { where: { attendanceid: itemId } });
    res.json({ id: itemId, ...updatedItem });
  } catch (err) {
    console.error(`Error in updateItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an item
const deleteAttendance = async (req, res) => {
  const itemId = req.params.id;
  try {
    await Attendance.destroy({ where: { attendanceid: itemId } });
    res.json({ message: 'Item deleted successfully', id: itemId });
  } catch (err) {
    console.error(`Error in deleteItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllAttendances,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  deleteAttendance
};
