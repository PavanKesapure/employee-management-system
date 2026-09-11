const DEPARTMENTS = ['Engineering', 'HR', 'Marketing', 'Sales', 'Finance', 'Support', 'Operations', 'Design'];

export default function EmployeeForm({ form, setForm, onSubmit, onCancel, editing }) {
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
        <div className="form-grid">
          <input name="name" placeholder="Full Name *" value={form.name} onChange={handle} required />
          <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handle} required />
          <input name="phone" placeholder="Phone *" value={form.phone} onChange={handle} required />
          <input name="position" placeholder="Position *" value={form.position} onChange={handle} required />
          <select name="department" value={form.department} onChange={handle} required>
            <option value="">Select Department *</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input name="salary" type="number" min="0" placeholder="Salary *" value={form.salary} onChange={handle} required />
          <select name="status" value={form.status} onChange={handle}>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
          <input name="address" placeholder="Address" value={form.address} onChange={handle} />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
