
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/errorResponse");
const { Op } = require('sequelize');
const asyncHandler = require("../middleware/async");
const User=require("../models/User")
const Plan=require("../models/Plan")
const Vote=require("../models/Vote");


exports.createPlan = asyncHandler(async (req, res, next) => {
  const {name,description,endVoteTime}=req.body
  const userId=req.user.id
  const plan=await Plan.create({name,description,endVoteTime,UserId:userId})
  res.status(201).json({ message: 'Plan created', plan });
})
exports.getAllPlan = asyncHandler(async (req, res, next) => {
    const getAllPlan=await Plan.findAll(
    {include:Vote})
  res.status(200).json({ data:getAllPlan });
})
exports.createVote = asyncHandler(async (req, res, next) => {
  const now=new Date()
  const targetPlan=await Plan.findByPk(req.params.id)
  const findVote=await Vote.findAll({where:{
    UserId:req.user.id,
    PlanId:req.params.id
  }
   
  })
  console.log(targetPlan);
  console.log(findVote);
  
  if(findVote.length!=0){
    return res.status(400).json({ message: 'you already vote to this plan' });
  }
  if(!targetPlan){
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  if (targetPlan.endVoteTime<now) {
    return res.status(400).json({ message: 'Voting time is end' });
  }

  const vote=await Vote.create({UserId:req.user.id,PlanId:req.params.id,isAgree:req.body.isAgree})

  res.status(201).json({ message: 'Vote Created', vote });

})
exports.getAllFinishVotePlan = asyncHandler(async (req, res, next) => {
    const now=new Date()
    const getAllPlan=await Plan.findAll({where:{
        endVoteTime:{
         [Op.lt]:now
        }
    }},{include:Vote})
  res.status(200).json({ data:getAllPlan });
})



