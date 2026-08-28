const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allows your HTML frontend to send data to this server

// 1. Connect to MongoDB
// Replace with your actual MongoDB URI (e.g., 'mongodb://127.0.0.1:27017/farmdirect')
mongoose
  .connect("mongodb://127.0.0.1:27017/farmdirect")
  .then(() => console.log("Connected to MongoDB Database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 2. Create the Mongoose Schema for Farmers
const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  farmName: { type: String, required: true },
  location: { type: String, required: true },
  produceType: { type: String, required: true },
  password: { type: String, required: true }, // In a real app, hash this using bcrypt!
  createdAt: { type: Date, default: Date.now },
});

const Farmer = mongoose.model("Farmer", farmerSchema);

// 3. Create the API Route to receive data from sell.html
app.post("/api/farmers/register", async (req, res) => {
  try {
    const { fullName, phone, farmName, location, produceType, password } =
      req.body;

    // Check if phone number is already registered
    const existingFarmer = await Farmer.findOne({ phone });
    if (existingFarmer) {
      return res
        .status(400)
        .json({ error: "Phone number is already registered." });
    }

    // Save new farmer to the database
    const newFarmer = new Farmer({
      fullName,
      phone,
      farmName,
      location,
      produceType,
      password,
    });

    await newFarmer.save();
    res.status(201).json({ message: "Farmer registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`FarmDirect Backend running on http://localhost:${PORT}`);
});
