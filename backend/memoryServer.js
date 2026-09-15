// In-memory fallback server - SAME API as server.js, no MongoDB needed.
// Data resets on restart. Use this when MongoDB is not available.
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let employees = [
  { _id: '1', name: 'Aarav Sharma', email: 'aarav@company.com', phone: '9876543210', position: 'Frontend Developer', department: 'Engineering', salary: 75000, status: 'Active', address: 'Mumbai', dateOfJoining: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: '2', name: 'Priya Patel', email: 'priya@company.com', phone: '9876543211', position: 'HR Manager', department: 'HR', salary: 65000, status: 'Active', address: 'Delhi', dateOfJoining: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: '3', name: 'Rahul Verma', email: 'rahul@company.com', phone: '9876543212', position: 'Sales Executive', department: 'Sales', salary: 55000, status: 'On Leave', address: 'Bangalore', dateOfJoining: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: '4', name: 'Sneha Iyer', email: 'sneha@company.com', phone: '9876543213', position: 'UI Designer', department: 'Design', salary: 70000, status: 'Active', address: 'Chennai', dateOfJoining: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: '5', name: 'Vikram Singh', email: 'vikram@company.com', phone: '9876543214', position: 'Accountant', department: 'Finance', salary: 60000, status: 'Inactive', address: 'Jaipur', dateOfJoining: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

function validate(data, isUpdate = false, selfId = null) {
  const errs = [];
  const req = ['name','email','phone','position','department','salary'];
  if (!isUpdate) req.forEach(f => { if (data[f] === undefined || data[f] === '') errs.push(f + ' is required'); });
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.push('Please enter a valid email');
  if (data.email && employees.some(e => e.email.toLowerCase() === String(data.email).toLowerCase() && e._id !== selfId)) {
    const err = new Error('Email already exists'); err.code = 11000; throw err;
  }
  if (data.salary !== undefined && Number(data.salary) < 0) errs.push('Salary must be >= 0');
  const depts = ['Engineering','HR','Marketing','Sales','Finance','Support','Operations','Design'];
  if (data.department && !depts.includes(data.department)) errs.push('Invalid department');
  const statuses = ['Active','On Leave','Inactive'];
  if (data.status && !statuses.includes(data.status)) errs.push('Invalid status');
  return errs;
}

app.get('/', (req, res) => res.json({ success: true, message: 'Employee Management System API is running (IN-MEMORY MODE, no MongoDB)', version: '1.0.0' }));

app.get('/api/employees/stats/summary', (req, res) => {
  const byMap = {};
  employees.forEach(e => { byMap[e.department] = (byMap[e.department] || 0) + 1; });
  const byDepartment = Object.entries(byMap).map(([k,v]) => ({ _id: k, count: v }));
  res.json({ success: true, data: {
    total: employees.length,
    active: employees.filter(e => e.status === 'Active').length,
    onLeave: employees.filter(e => e.status === 'On Leave').length,
    inactive: employees.filter(e => e.status === 'Inactive').length,
    byDepartment,
  }});
});

app.get('/api/employees', (req, res) => {
  const { search = '', department = '', status = '', sort = '-createdAt', page = 1, limit = 50 } = req.query;
  let out = [...employees];
  if (search) {
    const s = search.toLowerCase();
    out = out.filter(e => e.name.toLowerCase().includes(s) || e.email.toLowerCase().includes(s) || e.position.toLowerCase().includes(s));
  }
  if (department) out = out.filter(e => e.department === department);
  if (status) out = out.filter(e => e.status === status);
  const desc = sort.startsWith('-');
  const key = desc ? sort.slice(1) : sort;
  out.sort((a,b) => {
    const av = a[key] ?? '', bv = b[key] ?? '';
    if (av < bv) return desc ? 1 : -1;
    if (av > bv) return desc ? -1 : 1;
    return 0;
  });
  const total = out.length;
  const pg = Number(page), lm = Number(limit);
  out = out.slice((pg-1)*lm, (pg-1)*lm+lm);
  res.json({ success: true, count: out.length, total, page: pg, data: out });
});

app.get('/api/employees/:id', (req, res) => {
  const e = employees.find(x => x._id === req.params.id);
  if (!e) return res.status(404).json({ success: false, error: 'Employee not found' });
  res.json({ success: true, data: e });
});

app.post('/api/employees', (req, res) => {
  try {
    const errs = validate(req.body);
    if (errs.length) return res.status(400).json({ success: false, error: errs.join(', ') });
    const now = new Date().toISOString();
    const emp = { _id: crypto.randomUUID(), status: 'Active', address: '', dateOfJoining: now, ...req.body, createdAt: now, updatedAt: now };
    employees.push(emp);
    res.status(201).json({ success: true, data: emp });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, error: 'Email already exists' });
    throw err;
  }
});

app.put('/api/employees/:id', (req, res) => {
  const i = employees.findIndex(x => x._id === req.params.id);
  if (i === -1) return res.status(404).json({ success: false, error: 'Employee not found' });
  try {
    const errs = validate(req.body, true, req.params.id);
    if (errs.length) return res.status(400).json({ success: false, error: errs.join(', ') });
    employees[i] = { ...employees[i], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ success: true, data: employees[i] });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, error: 'Email already exists' });
    throw err;
  }
});

app.delete('/api/employees/:id', (req, res) => {
  const i = employees.findIndex(x => x._id === req.params.id);
  if (i === -1) return res.status(404).json({ success: false, error: 'Employee not found' });
  employees.splice(i,1);
  res.json({ success: true, message: 'Employee removed' });
});

app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));
// eslint-disable-next-line
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ success: false, error: 'Server error' }); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running (IN-MEMORY, no MongoDB) on http://localhost:${PORT}`));
