require('dotenv').config();
const connectDB = require('./config/db');
const Employee = require('./models/Employee');

const sample = [
  { name: 'Aarav Sharma', email: 'aarav@company.com', phone: '9876543210', position: 'Frontend Developer', department: 'Engineering', salary: 75000, status: 'Active', address: 'Mumbai' },
  { name: 'Priya Patel', email: 'priya@company.com', phone: '9876543211', position: 'HR Manager', department: 'HR', salary: 65000, status: 'Active', address: 'Delhi' },
  { name: 'Rahul Verma', email: 'rahul@company.com', phone: '9876543212', position: 'Sales Executive', department: 'Sales', salary: 55000, status: 'On Leave', address: 'Bangalore' },
  { name: 'Sneha Iyer', email: 'sneha@company.com', phone: '9876543213', position: 'UI Designer', department: 'Design', salary: 70000, status: 'Active', address: 'Chennai' },
  { name: 'Vikram Singh', email: 'vikram@company.com', phone: '9876543214', position: 'Accountant', department: 'Finance', salary: 60000, status: 'Inactive', address: 'Jaipur' },
];

(async () => {
  try {
    await connectDB();
    await Employee.deleteMany({});
    await Employee.insertMany(sample);
    console.log('Database seeded with sample employees');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
