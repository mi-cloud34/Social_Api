const JWT=require('jsonwebtoken');
const User = require("../models/user");
const httpStatus=require('http-status');
const authenticateToken=(req,res,next)=>{
  const authHeader=req.headers["authorization"];
  const token=authHeader&&authHeader.split(" ")[1];
  if (token===null) {
      return res.status(httpStatus.UNAUTHORIZED).send({error:"Bu işlemi yapmak için giriş yapmanız lazım"})
  }
  JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user)=>{
      if (err) return res.status(httpStatus.FORBIDDEN).send({error:"Token süresi geçmiş"});
      req.user=user._doc;
      //req.user_id=user._doc._id
      next();
  })
}
module.exports=authenticateToken;
/* const admin = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });

    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    const user = await User.findById(verified.id);
    if (user.type == "user" || user.type == "seller") {
      return res.status(401).json({ msg: "You are not an admin!" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */

module.exports = admin;