const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 


const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

// Register route - simplified version
router.post("/register", upload.single("profileImage"), registerUser);
//router.post('/register', registerUser);  // Directly use the imported function

// Login route
router.post("/login", loginUser);

// Get user info (commented out as it requires auth middleware)
 router.get("/getUser", protect, getUserInfo);

 router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
      console.log("File info:", req.file); 
  
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      return res.status(200).json({ imageUrl });
    } catch (err) {
      console.error("Upload Error 👉", err);
      return res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  
module.exports = router;