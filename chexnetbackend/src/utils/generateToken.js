import jwt from "jsonwebtoken";

const generateToken =  (_,res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_SECRET_EXPIRY
    });

    res.cookie('jwt',token,{
        httpOnly: true,
        secure: true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
};

export default generateToken