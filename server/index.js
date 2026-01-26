import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.send("Quiet Library API running...");
});

connectDB();


app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
