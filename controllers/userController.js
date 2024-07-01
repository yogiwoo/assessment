
const policyInfoCollection = require("../collections/policyInfo");
const userCollection = require("../collections/users");
const mongoose=require('mongoose')
const ObjectId=mongoose.Types.ObjectId
class user{
    async getPolicyInfo(req,res){
        let userName=req.query.user;
        let userId=await userCollection.findOne({firstName:{ $regex: '^' + userName, $options: 'i' }})
        if(userId){
            let policy=await policyInfoCollection.findOne({userId:new ObjectId(userId._id)})
            .populate("policyCategory","categoryName")
            .populate("company","companyName")
            .populate("agentId","agentName")
            .populate("userAccountId","accountName")
            console.log(policy)
            let userData={
                userName:userId.firstName,
                address:userId.address,
                zip:userId.zip,
                phone:userId.phoneNumber,
                email:userId.email,
                accountName:policy.userAccountId.accountName,
            }
            let policyData={
                userData:userData,
                agent:policy.agentId.agentName,
                policyNumber:policy.policyNumber,
                policyStartDate:policy.policyStartDate,
                policyEndDate:policy.policyEndDate,
                policyCategory:policy.policyCategory.categoryName,
                companyName:policy.company.companyName
            }
            res.status(200).json({message:"user policy details",policy:policyData})
        }
        else{
            res.status(404).json({message:"user does not exists"})
        }
    }

    async getUserPolicyList(req,res){
        let page;
        let limit;
        if (!req.query.page || !req.query.limit) {
          page = 1;
          limit = 10;
        } else {
          page = parseInt(req.query.page);
          limit = parseInt(req.query.limit);
        }
        let query=[
            {
            $lookup:{
                from:'users',
                localField:"userId",
                foreignField:"_id",
                as:"userData"
            }
        },{$unwind:"$userData"},
        {
            $lookup:{
                from:'policycategories',
                localField:"policyCategory",
                foreignField:"_id",
                as:"categoryData"
            }
        },{$unwind:"$categoryData"},
        {
            $lookup:{
                from:'policycareers',
                localField:"company",
                foreignField:"_id",
                as:"companyData"
            }
        },{$unwind:"$companyData"},
        {
            $lookup:{
                from:'agents',
                localField:"agentId",
                foreignField:"_id",
                as:"agent"
            }
        },{$unwind:"$agent"},
        {
            $lookup:{
                from:'useraccounts',
                localField:"userAccountId",
                foreignField:"_id",
                as:"accounts"
            }
        },{$unwind:"$accounts"},
        { $sort: { _id: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
        {
            $project:{
                userName:'$userData.firstName',
                address:"$userData.address",
                zip:"$userData.zip",
                email:"$userData.email",
                phone:"$userData.phone",
                agent:"$agent.agentName",
                company:"$companyData.comapanyName",
                category:"$categoryData.categoryName",
                policyNumber:1,
                policyStartDate:1,
                policyEndDate:1
            }
        }
        ]
        let aggregatedPolicy=await policyInfoCollection.aggregate(query)
        console.log(aggregatedPolicy)
        if(aggregatedPolicy.length>0){
            res.status(200).json({message:"list of user policy",policies:aggregatedPolicy})
        }
    }
}

module.exports=user