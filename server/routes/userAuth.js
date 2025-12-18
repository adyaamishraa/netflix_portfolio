const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// Register a new user

router.post("/register", async (req, res) => {
    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                error: "All fields (name, email, password) are required!"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);

        res.status(201).json({
            message: "User Registered SuccessFully",
            registeredUSER : result.rows[0]
        })
        
    } catch (error) {

        console.error("❌ Error registering user:", error);
        res.status(500).json({
            error: "Error registering user!"
        })
        
    }
})


// User Login

router.post("/login", async (req,res) => {
    try {

        console.log("BODY:", req.body); // debug

        const {name, password} = req.body;

        if(!name || !password){
            return res.status(400).json({error: "Name and password required"});
        }

        const result = await pool.query("SELECT * FROM users WHERE name = $1", [name]); // user found in db

        if(result.rows.length === 0){
            return res.status(401).json({
                error : "User not found! Please register first."
            })
        }

        const user = result.rows[0];
        const isMatch  = await bcrypt.compare(password, user.password); // password match check

        if(!isMatch){
            return res.status(401).json({
                error: "Password Match Failed!!"
            })
        }

        res.cookie("isUser", "true" , {httpOnly:true, secure: true, sameSite: "none"}); // login successful, set cookie
        res.status(200).json({
            message: 'User logged in successfully'
        })
        
    } catch (error) {

        console.error("❌ Error logging in user:", error);
        res.status(500).json({
            error: "Server error during user login"
        })
        
    }
})



// User Logout

router.post("/logout", async(req, res) => {
    res.clearCookie("isUser", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ 
        message: "👋 User logged out successfully" 
    });
})


// middleware to verify user authentication

const checkUser = (req,res,next) => {

    console.log("Received cookies:", req.cookies); // 👀 helps debug

    if (req.cookies?.isUser || req.cookies?.isAdmin) {

        return next();
        
    } else {

        res.status(401).json({
            error: "Please login to access this resource"
        })
        
    }
}


module.exports = { router, checkUser };