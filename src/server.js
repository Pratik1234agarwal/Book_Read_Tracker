const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));


app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})

app.get('/', function(req, res) {
    res.sendFile("build/index.html");
});