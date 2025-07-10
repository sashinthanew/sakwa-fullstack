const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

// Route Imports
const qualityCheckRoutes = require("./routes/qualityChecks");
const employeeRoutes = require("./routes/employeeRoutes");
const clarifaiRoutes = require("./routes/clarifaiRoutes");
const employeePerformanceRoutes = require("./routes/employeePerformanceRoutes");
const roboflowRoutes = require("./routes/roboflow-workflow");
const labelRoutes = require("./routes/labelRoutes");
const auth = require("./middleware/auth");

// Load environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined");
  process.exit(1);
}
if (!process.env.ROBOFLOW_API_KEY) {
  console.warn("⚠️ Warning: ROBOFLOW_API_KEY is not set");
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", auth, require("./routes/userRoutes"));
app.use("/api/suppliers", auth, require("./routes/supplierRoutes"));
app.use("/api/quality-checks", auth, qualityCheckRoutes);
app.use("/api/pre-processing", auth, require("./routes/preProcessing"));
app.use("/api/production-process", auth, require("./routes/productionProcess"));
app.use("/api/clarifai", auth, clarifaiRoutes);
app.use("/api/performance", auth, employeePerformanceRoutes);
app.use("/api/roboflow", auth, roboflowRoutes);
app.use("/api/labels", auth, labelRoutes);
app.use("/api", auth, employeeRoutes);

// MongoDB connection event logs
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});
mongoose.connection.on("disconnected", () => {
  console.log("🔁 MongoDB disconnected. Reconnecting...");
  setTimeout(() => {
    connectDB();
  }, 5000);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));