
const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const client = require("./client.js")
const venue = require("./venue.js")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json)


app.get("/",cors(),(req,res)=>{

})

app.post("/Login",async(req,res)=>{
    const{client_username,client_password}=req.body

    try{

        const validUser=await client.findOne({client_username})
        console.log(validUser);
        if(!validUser){
            res.status(404).json({"message":"User not Exist"})
        }
        const hashPassword = bcryptjs.compareSync(client_password,validUser.client_password)
        console.log("Password comparison result:", hashPassword);

        if(!hashPassword){
            res.status(404).json({"message":"Wrong password!"})
        }
        else{
            res.status(201).json({"message":"exist"})
        }
    
    }
    catch(e){
        res.json(e.message)
    }

})

app.post("/SignUp",async(req,res)=>{
    const{client_name, client_email, client_cnic, client_username, client_phone, client_password}=req.body
    console.log("Hello World: ",req.body);
    const hashPassword = bcryptjs.hashSync(client_password,10)
    const newClient = new client({
        client_name,
        client_email,
        client_cnic,
        client_username,
        client_phone,
        client_password : hashPassword})
    try {
        await newClient.save();
        console.log("Got the data");
        res.status(201).json({"message":"User created successfully"});
    } catch (e) {
        console.error(e); // Log the error details
        res.status(404).json({"message":"Failed to create client"});
    } 
})


const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(3000,()=>{
        console.log("port connected");
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});




