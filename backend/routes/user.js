import express from 'express';
import zod from 'zod';
import models from '../db.js';
import jwt from 'jsonwebtoken';
import  JWT_SECRET from './config.js';
const router = express.Router();
import authmiddleware from './middleware.js';
const signupvalidate = zod.object({
    username: zod.string().email(),
    firstName: zod.string(), 
    lastName: zod.string(),
    password: zod.string()
})
const signInValidate = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
const updateValidate=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.post('/signup', async (req, res) => {
    const { success } = signupvalidate.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existinguser = await models.User.findOne({
        username: req.body.username
    })
    if (existinguser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await models.User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    const userId = user._id;
    await models.Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    console.log("Signed Up SuccessFully");
    res.json({
        message: "User Created SuccessFully",
        token: token
    })
})
router.post('/signin', async (req, res) => {
    const { success } = signInValidate.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const existingUser = await models.User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (!existingUser) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const token = jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET);
    return res.status(200).json({
        token: token
    })
})
router.put('/',authmiddleware,async(req,res)=>{
    const {success} = updateValidate.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await models.User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";
    const users=await models.User.find({
        '$or':[{
            firstName:{
                "$regex":filter
            }
        },
        {
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
   
})
export default router;