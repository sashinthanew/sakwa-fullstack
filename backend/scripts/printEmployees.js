const mongoose = require('mongoose');
const Employee = require('../models/Employee');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function printEmployees() {
  await mongoose.connect(MONGO_URI);
  const emps = await Employee.find();
  console.log(JSON.stringify(emps.map(e => ({ _id: e._id, name: e.name, status: e.status })), null, 2));
  process.exit(0);
}

printEmployees().catch(err => {
  console.error('Error printing employees:', err);
  process.exit(1);
}); 