const mongoose =require('mongoose')
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

const policySchema=new schema({
    policyNumber:{type:String,default:""},
    policyStartDate:{type:Date,default:null},
    policyEndDate:{type:Date,default:null},
    policyCategory:{type:ObjectId,ref:"policyCategories",default:null}, //lob collection
    company:{type:ObjectId,ref:"policyCareer",default:null},
    userId:{type:ObjectId,ref:"users",default:null},
    agentId:{type:ObjectId,ref:"agents",default:null},
    userAccountId:{type:ObjectId,ref:"userAccounts",default:null},
  
})

const policyInfoCollection=mongoose.model("policyInfo",policySchema)
module.exports=policyInfoCollection;

//state, zip code, email, gender, userType
