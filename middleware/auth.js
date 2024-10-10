const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    if (!decoded) {
      console.log("in here");
      
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
      req.user = decoded;
      next();
   
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

exports.justAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    if (!decoded) {
      console.log("in here");
      
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
    if(decoded.isAdmin){

      req.user = decoded;
      next();
    }else{
      return next(new ErrorResponse("Just admin can access this route", 401));
    }
   
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});