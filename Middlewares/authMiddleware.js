const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // JWT secret from your .env file

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Bearer token

  // If no token is provided, respond with 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user data (e.g., userId) to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with 401 Unauthorized
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authenticateJWT;
