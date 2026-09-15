const db = require('../db/database');

// Get all customers
const getAllCustomers = (req, res) => {
  try {
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customers', error: error.message });
  }
};

// Get single customer
const getCustomerById = (req, res) => {
  try {
    const { id } = req.params;
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customer', error: error.message });
  }
};

// Create customer
const createCustomer = (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const validStatus = status === 'Inactive' ? 'Inactive' : 'Active';

    const stmt = db.prepare(`
      INSERT INTO customers (name, email, phone, company, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name.trim(), email.trim().toLowerCase(), phone || null, company || null, validStatus);

    const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: 'Customer created successfully', data: newCustomer });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create customer', error: error.message });
  }
};

// Update customer
const updateCustomer = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, status } = req.body;

    const existing = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const validStatus = status === 'Inactive' ? 'Inactive' : 'Active';

    const stmt = db.prepare(`
      UPDATE customers
      SET name = ?, email = ?, phone = ?, company = ?, status = ?
      WHERE id = ?
    `);
    stmt.run(name.trim(), email.trim().toLowerCase(), phone || null, company || null, validStatus, id);

    const updated = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    res.status(200).json({ success: true, message: 'Customer updated successfully', data: updated });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to update customer', error: error.message });
  }
};

// Delete customer
const deleteCustomer = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    db.prepare('DELETE FROM customers WHERE id = ?').run(id);
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete customer', error: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
