import express from 'express';
import authmiddleware from './middleware.js';
import models from '../db.js'
import mongoose from 'mongoose';
const router = express.Router();

router.get('/balance',authmiddleware,async(req,res)=>{
    const account=await models.Account.findOne({
        userId:req.userId,
    })
    res.json({
        balance: account.balance
    })
})
router.post('/transfer',authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
   const {amount,to}=req.body;
   const account =await models.Account.findOne({userId:req.userId}).session(session);
   if(!account || account.balance < amount){
    await session.abortTransaction();
    res.status(400).json({
        message:'Insufficient Balance' 
    }) 
   }
   const toAccount=await models.Account.findOne({userId:to}).session(session);
   if(!toAccount){
    await session.abortTransaction();
    res.status(400).json({
        message:'User not found'
    })
   }
   await models.Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
   await models.Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
   await session.commitTransaction();
   res.status(200).json({
       message:'Transaction Successful'
   })
})
export default router; 