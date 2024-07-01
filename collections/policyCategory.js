const mongoose =require('mongoose');
const schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;
//policyCategory   //LOB
const policyCategorySchema=new schema({
  categoryName:{type:String,default:""}
})

let policyCategoriesCollection=new mongoose.model('policyCategories',policyCategorySchema)
module.exports=policyCategoriesCollection;