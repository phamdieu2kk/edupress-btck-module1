// middlewares/isAdmin.js
module.exports = function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
