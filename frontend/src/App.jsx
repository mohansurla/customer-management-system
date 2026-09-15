import { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import './App.css';

const API_URL = 'http://localhost:5000/api/customers';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [view, setView] = useState('list'); // list | add | edit | details
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data);
      } else {
        setError(data.message || 'Failed to load customers');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showMessage = (msg, isError = false) => {
    if (isError) {
      setError(msg);
      setSuccess('');
    } else {
      setSuccess(msg);
      setError('');
    }
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setView('add');
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setView('edit');
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setView('details');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showMessage('Customer deleted');
        fetchCustomers();
        if (view === 'details') setView('list');
      } else {
        showMessage(data.message || 'Delete failed', true);
      }
    } catch (err) {
      showMessage('Delete failed', true);
    }
  };

  const handleSave = async (formData) => {
    try {
      const isEdit = view === 'edit' && selectedCustomer;
      const url = isEdit ? `${API_URL}/${selectedCustomer.id}` : API_URL;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        showMessage(isEdit ? 'Customer updated' : 'Customer added');
        setView('list');
        fetchCustomers();
      } else {
        showMessage(data.message || 'Save failed', true);
      }
    } catch (err) {
      showMessage('Save failed', true);
    }
  };

  const handleCancel = () => {
    setView('list');
    setSelectedCustomer(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Customer Management</h1>
        {view === 'list' && (
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Customer
          </button>
        )}
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <main>
        {loading && view === 'list' ? (
          <div className="loading">Loading customers...</div>
        ) : view === 'list' ? (
          <CustomerList
            customers={customers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : view === 'details' ? (
          <CustomerDetails
            customer={selectedCustomer}
            onEdit={() => handleEdit(selectedCustomer)}
            onDelete={() => handleDelete(selectedCustomer.id)}
            onBack={handleCancel}
          />
        ) : (
          <CustomerForm
            customer={selectedCustomer}
            onSave={handleSave}
            onCancel={handleCancel}
            isEdit={view === 'edit'}
          />
        )}
      </main>
    </div>
  );
}

export default App;
