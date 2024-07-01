const mongoose =require('mongoose');
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

const accountSchema=new schema({
    accountName:{type:String,default:""}
})

let accountsCollection=new mongoose.model('userAccounts',accountSchema)
module.exports=accountsCollection;