const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  jwt.verify(
    req.header("x-auth-token"),
    process.env.JWT_SECRET_KEY,
    (error, decoded) => {
      if (error) return res.status(401).send("invalid token");
      if (!(decoded.role == "user"))
        return res.status(401).send("access denied . no permission");
      req.body = { ...req.body, ...decoded };
      return next();
    }
  );
}

function adminAuth(req, res, next) {
  jwt.verify(
    req.header("x-auth-token"),
    process.env.JWT_SECRET_KEY,
    (error, decoded) => {
      if (error) return res.status(401).send("invalid token");
      if (!(decoded.role == "admin"))
        return res.status(401).send("access denied . no permission");
      req.body = { ...req.body, ...decoded };
      return next();
    }
  );
}

module.exports.userAuth = userAuth;
module.exports.adminAuth = adminAuth;
