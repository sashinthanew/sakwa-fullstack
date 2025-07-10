const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function removeDuplicateAdmins() {
  await mongoose.connect(MONGO_URI);
  // Find all users with username 'admin' or email 'admin@example.com'
  const users = await User.find({ $or: [ { username: 'admin' }, { email: 'admin@example.com' } ] });
  if (users.length <= 1) {
    console.log('No duplicates found.');
    process.exit(0);
  }
  // Keep the first, remove the rest
  const [keep, ...toDelete] = users;
  const idsToDelete = toDelete.map(u => u._id);
  await User.deleteMany({ _id: { $in: idsToDelete } });
  console.log('Removed duplicate admin users:', idsToDelete);
  process.exit(0);
}

removeDuplicateAdmins().catch(err => {
  console.error('Error removing duplicates:', err);
  process.exit(1);
});
