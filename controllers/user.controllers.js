import cookieParser from "cookie-parser";
import User from "./models/user.models.js";
import AppError from "./utils/user.utils.js";

const coolieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000 ,
    httpOnly:TransformStreamDefaultController,
    secure: true
}
//register
const register = async(req , res ,next)=>{
   const {fullName , email , password } = req.body;
    if (!fullName || !email || !password){
       return next(new AppError('All Fields are required' , 400));
    }
    const userExists = await User.findOne({email});

    if(userExists){ 
        return next (new AppError('Email already exists',400))
    }
    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:""
        }
    });
    if(!user){
        return next (new AppError('User registration failed , pleasw try agne',400))
    }
     //ToDo: file upload
     await user.save();

     user.password = undefined;

     const token = await user.generateJWTToken();

     res.cookie('token' ,token , coolieOptions);

     res.status(201).json({
        success:true,
        message:'user registered successfully',
        user,
     })
};

//login
const login = async (req , res)=>{
    try{
        const {email , password } = req.body;
        if (!email  || !password){
          return next(new AppError('All fields are required' , 400));
        }
        const user = await User.findOne({
          email
        }).select('+password');
        if(!user || !user.comparePassword(password)){
         return next(new AppError ('Email or password does not match' ,400))
        }
        const token = await user.generateJWTToken();
        user.password = undefined ;
        res.cookie('token' , token ,coolieOptions)
        res.status(200).json({
          success:true,
          message:'user loggedin successfully',
          user,
        });
    }catch(e){
        return next (new AppError(e.message, 500))
    }
};

// logout
const logout = (req , res)=>{

};

// getProfile
const getProfile = (req , res)=>{

};

export{
    register,
    login,
    logout,
    getProfile
}