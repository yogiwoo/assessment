const mongoose =require('mongoose');
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;
//policyCategory   //LOB
const messageSchema=new schema({
  message:{type:String,default:""},
  time:{type:Date,default:null}
})

let messageCollection=new mongoose.model('messages',messageSchema)
module.exports=messageCollection;