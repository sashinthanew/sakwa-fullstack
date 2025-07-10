const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function syncUsersToEmployees() {
  await mongoose.connect(MONGO_URI);
  const users = await User.find({ role: 'employee' });
  let created = 0;
  for (const user of users) {
    const exists = await Employee.findOne({ name: user.username });
    if (!exists) {
      await Employee.create({
        name: user.username,
        department: 'Not specified',
        position: 'Not specified',
        performanceScore: 50,
        attendance: 50,
        taskCompletion: 0,
        qualityOfWork: 0,
        teamCollaboration: 0,
        projectsCompleted: 0,
        status: 'Active'
      });
      created++;
    }
  }
  console.log(`Synced ${created} employees.`);
  process.exit(0);
}

syncUsersToEmployees().catch(err => {
  console.error('Error syncing users to employees:', err);
  process.exit(1);
}); 