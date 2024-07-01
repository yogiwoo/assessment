// const agentCollection=require("../collections/agents")
// const policyCareerCollection=require("../collections/policyCareer") //company
// const policyCategoriesCollection=require("../collections/policyCategory")
// const userCollection=require("../collections/users")
// const userAccountCollection=require("../collections/userAccounts")
// const policyInfoCollection=require("../collections/policyInfo")
// const csv = require("csvtojson");
// const {Worker,isMainThread,workerData}=require('worker_threads')
// const accountsCollection = require("../collections/userAccounts")
const {Worker}=require('worker_threads')
const path =require('path')

class agentController{
  
    
    async createAgent(req, res) {
    
        const csvFilePath=req.file.path;
        const worker=new Worker(path.join(__dirname,'./../handletasks/workerHandle.js'))

        worker.on('message',(message)=>{
            if(message==='done'){
                res.status(200).json({message:"csv processed"})
            }
        })


    worker.on('error', (error) => {
        res.status(500).send(`Worker error: ${error.message}`);
    });

    // worker.on('exit', (code) => {
    //     if (code !== 0) {
    //         res.status(500).send(`Worker stopped with exit code ${code}`);
    //     }
    // });

    worker.postMessage(csvFilePath);
    }
}

module.exports=agentController;