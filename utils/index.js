const jwt = require("jsonwebtoken");
const secret = "radhemongooose2022june23";

const logger = (req, res, next) => {
  console.log(req.url, req.method);
  next();
};

const authMiddleware = (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  let status = decode(token) !== null;

  if (status) {
    req.uid = decode(token)?.id;
    next();
  } else {
    res.json({
      status,
      msg: "invalid token",
      err: "token error:unauthorized request",
    });
  }
};

const encode = (id) => {
  jwt.sign({ id }, secret, (err, token) => {
    if (err) return null;
    return token;
  });
};
const decode = (token) => {
  jwt.verify(token, secret, (err, data) => {
    if (err) return null;
    return data;
  });
};

module.exports = {
  authMiddleware,
  encode,
  decode,
  logger,
};
