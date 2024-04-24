import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to mongodb')
})

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    }
})
const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,
        // default:0
    }
})
const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Amount',AccountSchema);
export default {User,Account}; 