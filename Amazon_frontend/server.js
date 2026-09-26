import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bloodconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ DB Error:", err));

// Schema
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String,
});
const Donor = mongoose.model("Donor", donorSchema);

// API to register donor
app.post("/register", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(200).json({ message: "Donor registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));