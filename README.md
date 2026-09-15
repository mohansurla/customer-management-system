# Customer Management System

A simple full-stack Customer Management System with CRUD operations.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)

## Features

- List all customers
- Add new customer
- View customer details
- Edit customer
- Delete customer (with confirmation)
- Input validation
- Success / error messages
- Loading state

## Customer Fields

- Name (required)
- Email (required, unique)
- Phone
- Company
- Status (Active / Inactive)
- Created Date (auto)

## Project Structure

```
customer-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── routes/
│   │   └── server.js
│   ├── data/          # SQLite DB file (auto-created)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm

### Backend

```bash
cd backend
npm install
npm run init-db   # optional, table is auto-created on start
npm run dev       # or npm start
```

Server runs at http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173 (Vite default)

### API Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /api/customers        | List all customers |
| GET    | /api/customers/:id    | Get one customer   |
| POST   | /api/customers        | Create customer    |
| PUT    | /api/customers/:id    | Update customer    |
| DELETE | /api/customers/:id    | Delete customer    |

## Assumptions

- No authentication required (assessment scope)
- Single user / local use
- Email must be unique
- Status defaults to Active
- Created date is set automatically by SQLite

## Notes

- UI is intentionally plain and functional
- SQLite database file is stored in `backend/data/customers.db`
- CORS enabled for local development
