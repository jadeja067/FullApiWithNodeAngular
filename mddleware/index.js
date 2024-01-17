const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
    if(!token) res.status(401).status({status: 401})
    jwt.verify(token, process.env.JWT_SECRET_KEY, (e) => {
    if(!e) next()
    else res.status(401).json({status: 401});
    });
}; 