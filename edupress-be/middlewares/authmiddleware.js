const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Không có token" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token)
    return res.status(401).json({ message: "Token không hợp lệ" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào req
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
}

module.exports = verifyToken;
