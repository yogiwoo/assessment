const messageCollection=require('./../collections/messages')
const schedule = require('node-schedule');
class message{
    async scheduleMessage(req,res){
        console.log("------------------------------",req.body)
        console.log("---------------------------____>",new Date())
        const {message,time}=req.body;
        const timing=new Date(time);
        console.log("++++++++++++++++++++++++++++++++",timing)
        schedule.scheduleJob(timing, async () => {
           await messageCollection.create({message:message,time:time})
        });
        res.status(200).json({message:"Message scheduled",text:message});
    }
}

module.exports=message