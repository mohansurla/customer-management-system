function CustomerDetails({ customer, onEdit, onDelete, onBack }) {
  if (!customer) return null;

  return (
    <div className="details-container">
      <div className="details-header">
        <h2>Customer Details</h2>
        <button className="btn" onClick={onBack}>Back to list</button>
      </div>

      <div className="details-card">
        <div className="detail-row">
          <span className="label">Name</span>
          <span className="value">{customer.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email</span>
          <span className="value">{customer.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Phone</span>
          <span className="value">{customer.phone || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Company</span>
          <span className="value">{customer.company || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Status</span>
          <span className={`status status-${customer.status.toLowerCase()}`}>
            {customer.status}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Created</span>
          <span className="value">
            {customer.created_at ? new Date(customer.created_at).toLocaleString() : '-'}
          </span>
        </div>
      </div>

      <div className="details-actions">
        <button className="btn btn-primary" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default CustomerDetails;
