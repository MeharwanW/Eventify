const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
 

const app = express();


app.get("./login" , (req , res) =>{
    res.render("login")
})

app.get("./signup" , (req , res) =>{
    res.render("signup")
})
const port = 3000;
app.listen(port , ()=>{
    console.log(`server is Running ${port} `)
})
