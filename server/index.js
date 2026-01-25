import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Quiet Library API running...");
  });

  //connectDB();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
