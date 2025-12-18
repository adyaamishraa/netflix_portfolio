const express = require('express');
const router = express.Router();
const pool = require('../db');
const cookieParser = require('cookie-parser');

router.use(cookieParser()); // ✅ important
console.log("✅ Admin creds:", process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);


// purpose is to login admin and logout admin

// Admin Login
router.post('/login', async (req, res) => {
    try {

        const {username, password} = req.body;

        if( username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
            res.cookie("isAdmin", true, {httpOnly:true});
            res.status(201).json({
                message: 'Admin logged in successfully'
            })
        }
        else{
            res.status(401).json({
                error: 'Cannot authenticate admin'
            })
        }

        console.log("🧠 Incoming admin login:", username, password); 
        console.log("Expected:", process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

        
    } catch (error) {

        console.error("❌ Error logging in admin:", error);
        res.status(500).json({ error: "Server error during login" });
        
    }
})



// Admin Logout

router.post('/logout', (req, res) => {
  res.clearCookie("isAdmin");
  res.status(200).json({ message: "👋 Admin logged out successfully" });
});




// middleware to verify admin authentication

const checkAdmin = (req,res,next) => {

    console.log("Received cookies:", req.cookies); // 👀 helps debug

    if (req.cookies.isAdmin === 'true' || req.cookies.isAdmin === true) {

        next();
        
    } else {

        res.status(403).json({
            error: 'Access denied. Admins only.'
        })
        
    }
}


module.exports = { router, checkAdmin };
