const JWT = require('jsonwebtoken');
const httpStatus = require('http-status');
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(":")[1];
  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için giriş yapmanız lazım" })
  }
  const key = "benimgizlianahtarım"
  console.log("tokenssss", token);
  JWT.verify(token, "passwordKey", (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({ error: "Token süresi geçmiş" });
    req.user = user;
    console.log("docssss", user._doc);
    console.log("userdoc", user);
    //req.user_id=user._doc._id
    next();
  })
}
/*const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });

    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/

module.exports = auth;