const Employee = require('../model/employee.model');

// Get all items
const getAllEmployees = async (req, res) => {
  try {
    const items = await Employee.findAll();
    res.json(items);
  } catch (err) {
    console.error('Error in getAllItems:', err);
    console.error(err.stack);  // Log the stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific item by ID
const getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {   
    const item = await Employee.findByPk(id);
    

    if (!item) {
      // Employee with the specified ID was not found
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(`Error in getItemById for ID ${id}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new item
const addEmployee = async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await Employee.create(newItem);
    res.json({ ...createdItem.toJSON(), id: createdItem.id });
  } catch (err) {
    console.error('Error in addItem:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;

  try {
    const existingEmployee = await Employee.findByPk(id);

    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update the fields individually, based on the keys present in the updatedItem
    Object.keys(updatedItem).forEach(key => {
      existingEmployee[key] = updatedItem[key];
    });

    await existingEmployee.save();

    res.json({ id: id, ...existingEmployee.toJSON() });
  } catch (err) {
    console.error(`Error in updateEmployee for ID ${id}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete an item
const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    await Employee.destroy({ where: { id: id } });
    res.json({ message: 'Item deleted successfully', id: id });
  } catch (err) {
    console.error(`Error in deleteItem for ID ${id}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
