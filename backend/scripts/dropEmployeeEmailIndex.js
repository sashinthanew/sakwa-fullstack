const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

async function dropIndex() {
  await mongoose.connect(MONGO_URI);
  try {
    await mongoose.connection.db.collection('employees').dropIndex('email_1');
    console.log('Dropped index email_1 from employees collection');
  } catch (err) {
    console.error('Error dropping index:', err.message);
  }
  process.exit(0);
}

dropIndex(); 