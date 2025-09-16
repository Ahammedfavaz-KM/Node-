const http = require("http");

const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/plain"});
    res.send("Hello, World\n");
})

server.listen(3000,()=>{
    console.log(" running")
})