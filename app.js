
const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
//const bodyParser = require("body-parser")
const cors = require("cors")
//const jwt = require("jsonwebtoken")

const client = require("./client.js")
const venue = require("./venue.js")

//const SECRET_KEY ='secretkey'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//app.use(bodyParser.json)


app.get("/",cors(),(req,res)=>{

})

app.post("/Venues", async(req,res)=>{
    try{
        const {venue_id,venue_category,venue_location,venue_type,no_of_guests}=req.body

        const newVenue = new venue({
            venue_id,
            venue_category,
            venue_location,
            venue_type,
            no_of_guests  
        })

        await newVenue.save()
        console.log("Got the data");
        res.status(201).json({"message":"Venue created successfully"});
    } catch (e) {
        console.error(e); // Log the error details
        res.status(404).json({"message":"Failed to create venue"});
    } 

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

        // const token = jwt.sign({client_id: client._id},SECRET_KEY,{expiresIn:'1hr'})
        // res.json({"message":"Login Succesfull"})
    
    }
    catch(e){
        res.json(e.message)
    }

})

app.post("/SignUp",async(req,res)=>{
    try{

        const{client_name, client_email, client_username, client_password, client_phone, client_cnic}=req.body
    
        console.log("Hello World: ",req.body);
        
        const hashPassword = bcryptjs.hashSync(client_password,10)

        
        const newClient = new client({
            client_name,
            client_email,
            client_username,
            client_password : hashPassword,
            client_phone,
            client_cnic})
    
        await newClient.save();
        console.log("Got the data");
        res.status(201).json({"message":"User created successfully"});

    } catch (e) {
        console.error(e); // Log the error details
        res.status(404).json({"message":"Failed to create client"});
    } 
})


const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

//const mongoURI = process.env.MONGODB_URI
mongoose.connect(uri, {
    // useNewUrlParser:true,
    // useUnifiedTopology:true
})
.then(() => {
    console.log("MongoDB connected");
    //const PORT = process.env.PORT || 3000;
    app.listen(3000,()=>{
        console.log("port connected");
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});




