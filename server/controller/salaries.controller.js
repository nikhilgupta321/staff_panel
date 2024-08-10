const Salary = require('../model/salaries.model');

// Get all items
const getAllSalaries = async (req, res) => {
  try {
    const items = await Salary.findAll();
    res.json(items);
  } catch (err) {
    console.error('Error in getAllItems:', err);
    console.error(err.stack);  // Log the stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific item by ID
const getSalariesById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Salary.findByPk(itemId);  
    res.json(item);
  } catch (err) {
    console.error(`Error in getSalaryById for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new item
const addSalary = async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await Salary.create(newItem);
    res.json(createdItem);
  } catch (err) {
    console.error('Error in addItem:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an item  
const updateSalary = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    await Salary.update(updatedItem, { where: { id: itemId } });
    res.json({ id: itemId, ...updatedItem });
  } catch (err) {
    console.error(`Error in updateItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an item
const deleteSalary = async (req, res) => {
  const itemId = req.params.id;
  try {
    await Salary.destroy({ where: { salaryid: itemId } });
    res.json({ message: 'Item deleted successfully', id: itemId });
  } catch (err) {
    console.error(`Error in deleteItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSalaries,
  getSalariesById,
  addSalary,
  updateSalary,
  deleteSalary
};
