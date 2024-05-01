
const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
const client = require("./client.js")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


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
    const hashPassword = bcryptjs.hashSync(client_password,10)

    const newClient = new client({
        client_name,
        client_email,
        client_cnic,
        client_username,
        client_phone,
        client_password : hashPassword})

    // const data={
    //     client_name: name,
    //     client_email: email,
    //     client_password: hashPassword,
    //     client_cnic: CNIC,
    //     client_username: username,
    //     client_phone: number


    // }

    try{

        await newClient.save();
        res.status(201).json({"message":"User created successfully"})
        //const check=await client.findOne({client_username:username, client_password:password})

        // if(check){
        //     res.json("exist")
        // }
        // else{
        //     res.json("notexist")
        //     await client.save()
        //     // await client.insertMany([data])
        // }

    }
    catch(e){
        res.status(404).json({"message":"Failed to create client"})
        
    }

})


const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

mongoose.connect(uri, {
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




