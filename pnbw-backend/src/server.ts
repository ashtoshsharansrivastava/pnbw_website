import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import apiRouter from "./routes";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// 1) Middleware
app.use(cors());
app.use(express.json());

// 2) Database
connectDB();

// 3) Routes
app.use("/api/v1", apiRouter);

// 4) Health check
app.get("/", (_, res) => {
  res.send("PNBW backend is alive 🚀");
});

// 5) Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
