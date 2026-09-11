export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) return <p className="empty">No employees found. Click “+ Add Employee” to create one.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e._id}>
              <td><strong>{e.name}</strong><br /><small>{e.phone}</small></td>
              <td>{e.email}</td>
              <td>{e.position}</td>
              <td><span className="badge">{e.department}</span></td>
              <td>₹{Number(e.salary).toLocaleString('en-IN')}</td>
              <td><span className={`status ${e.status.replace(' ', '-').toLowerCase()}`}>{e.status}</span></td>
              <td className="row-actions">
                <button className="btn btn-small" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => onDelete(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
