const express=require('express')
const router=express.Router();
const multer=require('multer');
const upload = multer({
    dest: __dirname + "/uploads/"
});

const agentModel=require('./controllers/handleCSV')
const messageModel=require('./controllers/messageSchedule')
const userModel=require('./controllers/userController')
const {createAgent,getAgent}=new agentModel()
const {scheduleMessage}=new messageModel()
const {getPolicyInfo,getUserPolicyList}=new userModel();
router.use(express.json())
router.post('/create/agents',upload.single('files'),async(req,res)=>{
    await createAgent(req,res);
})

router.post("/schedule/message",async (req,res)=>{
    await scheduleMessage(req,res)
})

router.get("/getPolicyInfo",async (req,res)=>{
    await getPolicyInfo(req,res)
})

router.get("/userPolicyList",async (req,res)=>{
    await getUserPolicyList(req,res)
})



module.exports=router