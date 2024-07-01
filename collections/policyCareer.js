//company name
const mongoose =require('mongoose');
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

const policyCareerSchema=new schema({
  companyName:{type:String,default:""}
})

let policyCareerCollection=new mongoose.model('policyCareer',policyCareerSchema)
module.exports=policyCareerCollection;