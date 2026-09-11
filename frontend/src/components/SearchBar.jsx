export default function SearchBar({ search, setSearch, department, setDepartment, status, setStatus }) {
  return (
    <div className="toolbar">
      <input
        className="search"
        placeholder="🔍 Search by name, email, position..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        {['Engineering', 'HR', 'Marketing', 'Sales', 'Finance', 'Support', 'Operations', 'Design'].map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option>Active</option>
        <option>On Leave</option>
        <option>Inactive</option>
      </select>
    </div>
  );
}
