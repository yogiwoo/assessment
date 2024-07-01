const mongoose=require('mongoose')
require('dotenv').config()
async function connectToLocal(){
    try{
    const uri=process.env.url
    await mongoose.connect(uri,{
      dbName:"insuredMine"
    })
    console.log("mongo connected to local")
}
catch(error){
    console.log("mongo failed to connect",error);
    process.exit(1);
}
}

module.exports=connectToLocal;