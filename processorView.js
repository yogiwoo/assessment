const pm2=require("pm2")
const pidusage=require('pidusage')

const appname="insuredMine"
const maxUsage=70;

function monitorCpu(){
    pm2.describe(appname,(err,description)=>{
        if(err){
            console.log("--- error found -----",err)
            return ;
        }
        console.log(description)
        if(!description[0] || !description[0].pid){
            console.log("process not found")
            return ;
        }
        const pid=description[0].pid
        pidusage(pid,(err,stats)=>{
            if(err){
                return
            }
            if(stats.cpu>maxUsage){
                pm2.restart(appname,(err)=>{
                    if(err){
                        return
                    }
                    console.log("------------ restarting App --------------")
                })
            }
        })
    })
}

setInterval(() => {
    monitorCpu()
}, 3000);

// Connect to PM2
pm2.connect((err) => {
    if (err) {
        console.error("Error connecting to PM2:", err);
        process.exit(2);
    }
});