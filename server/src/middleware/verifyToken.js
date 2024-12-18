import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Faild at accessToken",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, decode) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "AccessToken hết hạn",
      });
    req.user = decode;
    next();
  });
};

export default verifyToken;
