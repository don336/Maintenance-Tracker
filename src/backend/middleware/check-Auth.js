import jwt from "jsonwebtoken"

export default  (req, res, next)=>{
  try {
    const token  = req.header("Authorization");
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.requests = decode
    next()
  } catch (err){
    return res.status(401).json({
      Error_message: "Access denied, You're not registered/logged in as a user"
    })
    
  }
}