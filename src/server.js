const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));


let port = process.env.PORT || 8080 

app.listen(port,()=>{
    console.log("Server is running at port "+port);
})

app.get('/', function(req, res) {
    res.sendFile("build/index.html");
});