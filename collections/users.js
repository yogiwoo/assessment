const mongoose =require('mongoose')
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

const userSchema=new schema({
    firstName:{type:String,require:true},
    DOB:{type:Date,default:""},                 //YYYY-MM-DD
    address:{type:String,require:true},
    phoneNumber:{type:String,require:true},
    state:{type:String,require:true},
    zip:{type:String,require:true},
    email:{type:String,require:true},
    gender:{type:String,require:true},
    userType:{type:String,require:true}
})
const userCollection=new mongoose.model('users',userSchema);
module.exports=userCollection;
//state, zip code, email, gender, userType
