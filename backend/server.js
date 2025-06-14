const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require('./config/db');
const qualityCheckRoutes = require('./routes/qualityChecks');
const employeeRoutes = require("./routes/employeeRoutes");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Check Mongo URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api", employeeRoutes);
app.use("/api/quality-checks", qualityCheckRoutes);
app.use('/api/pre-processing', require('./routes/preProcessing'));
app.use('/api/production-process', require('./routes/productionProcess'));

// MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Attempting to reconnect...");
  setTimeout(() => {
    connectDB();
  }, 5000);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
