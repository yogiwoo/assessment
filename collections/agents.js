const mongoose =require('mongoose')
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

const agentSchema=new schema({
    agentName:{type:String,require:true},
})

const agentCollection=new mongoose.model('agents',agentSchema);
module.exports =agentCollection;