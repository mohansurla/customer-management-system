const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/customers.db');
const db = new Database(dbPath);

// Create customers table
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    company TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

console.log('Database initialized successfully at', dbPath);
db.close();
