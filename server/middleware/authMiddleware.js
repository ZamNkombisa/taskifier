const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // Get the token from the authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }
  // Verify the token
  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
