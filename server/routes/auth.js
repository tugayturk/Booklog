import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

         // 3️⃣ şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    try{
        // kullanıcı var mı
        const user= await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // şifre doğru mu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // token oluştur
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
        res.status(200).json({ message: "Login successful", token,user:{ id: user._id, name: user.name, email: user.email  } });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;