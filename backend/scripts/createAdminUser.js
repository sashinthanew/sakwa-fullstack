const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function createOrUpdateAdmin() {
  await mongoose.connect(MONGO_URI);
  const email = 'admin@example.com';
  const password = 'admin9052';
  const username = 'admin';
  const role = 'admin';

  // Find by email or username (to avoid duplicate key error)
  let user = await User.findOne({ $or: [ { email }, { username } ] });
  const hashed = await bcrypt.hash(password, 10);
  if (user) {
    user.email = email;
    user.password = hashed;
    user.username = username;
    user.role = role;
    await user.save();
    console.log('Admin user updated:', email);
    process.exit(0);
    return;
  }
  user = new User({ username, email, password: hashed, role });
  await user.save();
  console.log('Admin user created:', email);
  process.exit(0);
}

// Removed login function. This script only creates or updates the admin user for the admin dashboard.

