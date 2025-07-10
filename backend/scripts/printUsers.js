const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function printUsers() {
  await mongoose.connect(MONGO_URI);
  const users = await User.find({});
  console.log('All users:');
  users.forEach(u => {
    console.log({
      id: u._id,
      username: u.username,
      email: u.email,
      role: u.role
    });
  });
  process.exit(0);
}

printUsers().catch(err => {
  console.error('Error printing users:', err);
  process.exit(1);
});
