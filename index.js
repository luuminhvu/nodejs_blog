const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) =>{
    var a= 3;
    var b= 5;
    var c= a+b;
    console.log("Hello World");
    res.send(c.toString());}
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));