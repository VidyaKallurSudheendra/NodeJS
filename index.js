const http= require('http');
const fs= require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');
const uri ="mongodb+srv://vidya:kallur@cluster0.ekzc69q.mongodb.net/test";
const client = new MongoClient(uri);

const DBconnect=async()=>{
    try{
        await client.connect();
        console.log("db connected")
    
    }
    catch(e){
        console.log(e)
    }
}
DBconnect();
const server   =http.createServer(async(req,res) => {
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",

  
  };
console.log(req.url)
if(req.url === '/'){
    fs.readFile( path.join(__dirname,'public','index.html'),(err,data)=>{

    if (err) throw err;
    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    res.end(data);
    }
 )
 
}
else if(req.url=='/api')
{
    // fs.readFile( path.join(__dirname,'public','db.json'),(err,data)=>{
    //     if (err) throw err;
    //     res.writeHead(200,headers);		
    //     res.end(data);
    //     })
    const cursor = client.db("patho").collection("patho.pathogenesis").find({});

    const results = await cursor.toArray();
 
    const js= (JSON.stringify(results));
    res.writeHead(200,headers)
    console.log(js);
    res.end(js);

}
else{

    res.end("Eror 404")
}

});

const PORT = process.env.PORT || 1595;
server.listen(PORT,() => console.log(`yay the server is running finally ${PORT}`));
