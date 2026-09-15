function CustomerList({ customers, onView, onEdit, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="empty">
        <p>No customers yet.</p>
        <p className="hint">Click "Add Customer" to create one.</p>
      </div>
    );
  }

  return (
    <div className="customer-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.company || '-'}</td>
              <td>
                <span className={`status status-${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </td>
              <td className="actions">
                <button className="btn btn-sm" onClick={() => onView(c)}>View</button>
                <button className="btn btn-sm" onClick={() => onEdit(c)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
