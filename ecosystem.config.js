module.exports = {
  apps : [{
    name   : "insuredMine",
    script : "./app.js",
    autorestart:true,
    restart_delay: 1000,
    max_cpu: 70
  },{
    name:'Montior',
    script:"./processorView.js",
    autorestart:true,
    restart_delay:3000
  }]
}
