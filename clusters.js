const cluster = require("cluster")
const os = require("os")

const CPUS = os.cpus()

if(cluster.isMaster){
    CPUS.forEach(() => cluster.fork());

    cluster.on("Listando", worker => {
        console.log(`Cluster ${worker.process.pid} conectado`)
    })

    cluster.on("Desconectando", worker => {
        console.log(`Cluster ${worker.process.pid} desconectado`)
    })
    
    cluster.on("Saindo", worker => {
        console.log(`Cluster ${worker.process.pid} saiu do ar`)
        cluster.fork()
    })
} else {
    require('./index.js')
}