
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User=require("../models/User")

exports.register = asyncHandler(async (req, res, next) => {
    const {username,isAdmin,password}=req.body

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ username, isAdmin, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  
})

exports.login = asyncHandler(async (req, res, next) => {
    const {username,password}=req.body
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id,username:user.username,isAdmin:user.isAdmin },process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });


})



