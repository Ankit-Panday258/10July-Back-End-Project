import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs'
import  Jwt  from "jsonwebtoken";
const userSchema = new Schema ({
  fullName:{
      type:"String",
      required:[true , "Name is requied "],
      minLength:[5 , "Name must be at least 5 charchter"],
      maxLength:[50 , "Name should be less that 50 charchter "],
      lowercase:true,
      trim:true,
  },
  email:{
    type:"String",
    required:[true , "Email is required"],
    lowercase:true,
    unique:true
  },
  password:{
    type:"String",
    required:[true , "Password required "],
    minLength:[8 , "Password must be at least 8 charchter "],
    select:false 
  } ,
  avatar:{
    public_id:{
        type:'String'
    },
    secure_url:{
        type:'String'
    }
  },
  role:{
    type:'String',
    enum:['USER',ADMIN],
    default:'USER'
  },
  forgotPassWordToken: String,
  forgotPassWordExpiry:Date

},{
    timeseries:true
});

userSchema.pre("save" , async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);

});
userSchema.methods = {
    generateJWTToken:async function(){
        return await jwt.sign(
            {id:this._id , email:this.email , subscription:this.subscription , role:this.role},
                process.env.JWT_SECRET
        )
    },
    comparePassword: async function (plainTextPassword){
        return await bycrypt.compare(plainTextPassword , this.password)
    }
}
const User = model('User' , userSchema);

export default User;