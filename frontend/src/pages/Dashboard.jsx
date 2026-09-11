import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { fetchEmployees, fetchStats, createEmployee, updateEmployee, deleteEmployee } from '../services/api';

const EMPTY = { name: '', email: '', phone: '', position: '', department: '', salary: '', status: 'Active', address: '' };

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [empRes, statRes] = await Promise.all([
        fetchEmployees({ search, department, status, limit: 100 }),
        fetchStats(),
      ]);
      setEmployees(empRes.data.data);
      setStats(statRes.data.data);
      setError('');
    } catch {
      setError('Cannot reach backend at http://localhost:5000. Start backend with `npm run dev` and check MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department, status]);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (emp) => { setEditing(emp); setForm({ ...emp }); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateEmployee(editing._id, form);
      else await createEmployee(form);
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await deleteEmployee(id);
    load();
  };

  return (
    <div className="container">
      <Navbar onAdd={openAdd} />
      <StatsCards stats={stats} />
      <SearchBar
        search={search} setSearch={setSearch}
        department={department} setDepartment={setDepartment}
        status={status} setStatus={setStatus}
      />
      {error && <div className="alert">{error}</div>}
      {loading ? <p className="empty">Loading...</p> : (
        <EmployeeTable employees={employees} onEdit={openEdit} onDelete={handleDelete} />
      )}
      {showForm && (
        <EmployeeForm
          form={form} setForm={setForm}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
