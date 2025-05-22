const User = require('../models/User');
const jwt = require("jsonwebtoken");
// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};
// Register User
exports.registerUser = async (req, res) => { 
  const { fullName, email, password, profileImageUrl } = req.body;
  // Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl
    });
    // Return success response with user details and token
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (err) {
    // Error during user registration
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};
// Login User
exports.loginUser = async (req, res) => { 
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email" });
    }
    // Check if the password matches
    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    // Error during login
    res.status(500).json({ message: "Error logging in user", error: err.message });
  }
};
// Get User Info
exports.getUserInfo = async (req, res) => { 
  try {
    // Fetch user data without password field
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return user data
    res.status(200).json(user);
  } catch (err) {
    // Error during fetching user info
    res.status(500).json({ message: "Error retrieving user info", error: err.message });
  }
};




















// const User = require('../models/User');
// const jwt  = require("jsonwebtoken");


// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn:"24h"
//     });
// }
// exports.registerUser = async (req, res) => { 
//     const{fullName , email , password , profileImageUrl} = req.body;
//     //validation
//     if(!fullName || !email || !password){
//         return res.status(400).json({message: "All fields are required"});
//     }
//     try{

//         const existingUser = await User.findOne({email});
//         if(existingUser){
//             return res.status(400).json ({message: "Email already in use"});
//         }
//         //create user
//         const user = await User.create({
//             fullName,
//             email,
//             password,
//             profileImageUrl
//         });
//         res.status(201).json({ id: user._id, user , token: generateToken(user._id),});
//     }catch(err){
//         res 
//         .status(500)
//         .json({message: "error registering user", error : err.message});
//     }
// };
// exports.loginUser = async (req, res) => { 
// const {email , password} = req.body;
// if(!email || !password){
//     return res.status(400).json({message: "All fields are required"});
// }
// try{
//     const user = await  User.findOne({email});
//     if(!user || !(await user.comparePassword(password))){
//         return res.status(400).json({message: "Invalid credentials"});
//     }
//     res.status(200).json({
//         id: user._id,
//         user,
//         token: generateToken(user._id),
//     });
// }catch(err){
//     res
//      .status(500)
//      .json({message : "Error registering user", error: err.message});
// }
// };
// exports.getUserInfo = async (req, res) => { 
//     try{
//         const user = await User.findById(req.user.id).select("-password");
//         if(!user){
//             return res.status(404).json({message: "User not found"});
//         }
//         res.status(200).json(user);
//     } catch(err){
//         res 
//         .status(500)
//         .json({message : "Error registering user", error: err.message});
//     }
// };
