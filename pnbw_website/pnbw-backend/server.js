import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";


import authRoutes      from "./routes/auth.js";
import propertyRoutes  from "./routes/properties.js";
import brokerRoutes    from "./routes/brokers.js";
import enquiryRoutes   from "./routes/enquiries.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });


/* ---------- Global middleware ---------- */
app.use(cors({ origin: "http://localhost:5173" })); // adjust to your Vite origin
app.use(express.json());

/* ---------- API routes ---------- */
app.use("/api/auth",       authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/brokers",    brokerRoutes);

/* ---------- Health check ---------- */
app.get("/", (_req, res) => res.send("PNBW API running 🚀"));

/* ---------- Start server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐  Server running on port ${PORT}`);
});
