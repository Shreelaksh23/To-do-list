// const jwt=require("jsonwebtoken");
// const authMiddleware=(req,res,next)=>{
//     try {
//         // 1. Get token from header
//         const authHeader=req.headers.authorization;
//         if(!authHeader || !authHeader.startsWith("Bearer")){
//             return res.status(401).json({message:"Unauthorized, no token provided"})
//         }

//         const token=authHeader.split(" ")[1];

//         //2.Verify token
//         const decoded=jwt.verify(token,process.env.JWT_SECRET)

//         //3.Add user ID to request
//         req.userId=decoded.id;

//         next(); // continue to the next function
//     } catch (error) {
//         res.status(401).json({message:"Invaild token",error})
//     }
// }

// module.exports=authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
