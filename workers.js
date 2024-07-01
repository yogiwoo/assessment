const {isMainThread,Worker, workerData} =require('worker_threads')


if(isMainThread){
    console.log('master',process.pid)
    new Worker(__filename,{
        workerData:[3,492,19,12,3,4,519,2,4,5,6,2,2,3,2,4,5,]
    });
    new Worker(__filename,{
        workerData:[4,2,4,2,40,1,4,5,2,67,89,23,45,65,78,10,24,90]
    });
}
else{
    // console.log('slaver')
    // console.log(`workers ${process.pid}`)
    console.log("worker data",workerData)
}

