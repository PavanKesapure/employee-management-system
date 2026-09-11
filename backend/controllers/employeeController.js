const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

// @desc    Get all employees (with search, filter, sort, pagination)
// @route   GET /api/employees
const getEmployees = asyncHandler(async (req, res) => {
  const { search = '', department = '', status = '', sort = '-createdAt', page = 1, limit = 50 } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
    ];
  }
  if (department) query.department = department;
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Employee.countDocuments(query);
  const employees = await Employee.find(query).sort(sort).skip(skip).limit(Number(limit));

  res.json({ success: true, count: employees.length, total, page: Number(page), data: employees });
});

// @desc    Get single employee
// @route   GET /api/employees/:id
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  res.json({ success: true, data: employee });
});

// @desc    Create employee
// @route   POST /api/employees
const createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json({ success: true, data: employee });
});

// @desc    Update employee
// @route   PUT /api/employees/:id
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  res.json({ success: true, data: employee });
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  res.json({ success: true, message: 'Employee removed' });
});

// @desc    Dashboard stats
// @route   GET /api/employees/stats/summary
const getStats = asyncHandler(async (req, res) => {
  const total = await Employee.countDocuments();
  const active = await Employee.countDocuments({ status: 'Active' });
  const onLeave = await Employee.countDocuments({ status: 'On Leave' });
  const inactive = await Employee.countDocuments({ status: 'Inactive' });
  const byDepartment = await Employee.aggregate([{ $group: { _id: '$department', count: { $sum: 1 } } }]);
  res.json({ success: true, data: { total, active, onLeave, inactive, byDepartment } });
});

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getStats };
