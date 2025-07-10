const express = require("express");
const Supplier = require("../models/Supplier");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

// Set up multer storage for profile photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Get All Suppliers
router.get("/", auth, async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Supplier
router.get("/:id", auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Supplier Performance
router.get("/:id/performance", auth, async (req, res) => {
  try {
    console.log(`Fetching performance for supplier: ${req.params.id}`);
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      console.log(`Supplier not found: ${req.params.id}`);
      return res.status(404).json({ message: "Supplier not found" });
    }

    const deliveries = supplier.deliveries || [];
    const totalDeliveries = deliveries.length;
    let onTimeCount = 0;
    let qualitySum = 0;

    deliveries.forEach((delivery) => {
      if (delivery.onTime) onTimeCount++;
      qualitySum += delivery.qualityScore || 0;
    });

    const onTimeDeliveryRate = totalDeliveries === 0 ? 0 : (onTimeCount / totalDeliveries) * 100;
    const averageQualityScore = totalDeliveries === 0 ? 0 : qualitySum / totalDeliveries;

    res.json({
      totalDeliveries,
      onTimeDeliveryRate: onTimeDeliveryRate.toFixed(2) + "%",
      averageQualityScore: averageQualityScore.toFixed(2),
      performanceData: deliveries.map((d) => ({
        date: d.date,
        quantity: d.quantity,
        qualityScore: d.qualityScore,
        onTime: d.onTime,
      })),
    });
  } catch (error) {
    console.error(`Error in GET /:id/performance:`, error);
    res.status(500).json({
      message: "Error fetching performance data",
      error: error.message,
    });
  }
});

// Add Supplier Performance Data
router.post("/:id/performance", auth, async (req, res) => {
  try {
    const { quantity, qualityScore, onTime } = req.body;

    if (typeof quantity !== "number" || isNaN(quantity)) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    if (typeof qualityScore !== "number" || qualityScore < 0 || qualityScore > 100) {
      return res.status(400).json({ message: "Quality score must be between 0-100" });
    }
    if (typeof onTime !== "boolean") {
      return res.status(400).json({ message: "onTime must be boolean" });
    }

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.deliveries.push({
      date: new Date(),
      quantity,
      qualityScore,
      onTime,
    });

    await supplier.save();
    res.status(201).json(supplier.deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Supplier
router.post("/", auth, upload.single("profilePhoto"), async (req, res) => {
  try {
    const { supplierName, vehicleType, supplierQuantity } = req.body;
    if (!supplierName || !vehicleType || supplierQuantity === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let profilePhoto = "";
    if (req.file) {
      profilePhoto = `uploads/${req.file.filename}`;
    } else if (req.body.profilePhoto) {
      profilePhoto = req.body.profilePhoto;
    }
    const supplier = new Supplier({
      supplierName,
      vehicleType,
      supplierQuantity,
      profilePhoto,
    });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Supplier
router.put("/:id", auth, upload.single("profilePhoto"), async (req, res) => {
  try {
    const { supplierName, vehicleType, supplierQuantity, address, department, workTime, workDates, phone, email } = req.body;
    let updateData = {
      supplierName,
      vehicleType,
      supplierQuantity,
      address,
      department,
      workTime,
      workDates,
      phone,
      email,
    };
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
    if (req.file) {
      updateData.profilePhoto = `uploads/${req.file.filename}`;
    }
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Supplier Performance Dashboard Data
router.get("/performance/dashboard", auth, async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const totalSuppliers = suppliers.length;
    const totalQuantity = suppliers.reduce((sum, s) => sum + (s.supplierQuantity || 0), 0);
    const avgQuantity = totalSuppliers ? totalQuantity / totalSuppliers : 0;
    const vehicleTypeCounts = {};
    suppliers.forEach((s) => {
      if (s.vehicleType) {
        vehicleTypeCounts[s.vehicleType] = (vehicleTypeCounts[s.vehicleType] || 0) + 1;
      }
    });
    const topVehicleType = Object.entries(vehicleTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    res.json({
      totalSuppliers,
      avgQuantity,
      topVehicleType,
      vehicleTypeCounts,
      suppliers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Supplier
router.delete("/:id", auth, async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;