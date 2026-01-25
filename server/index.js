import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Quiet Library API running...");
  });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
