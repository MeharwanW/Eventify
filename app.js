
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
//const jwt = require("jsonwebtoken")
const path = require("path");
const cookieParser = require("cookie-parser")

// Multer importss
// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

//var nodemailer = require('nodemailer');

const dotenv = require("dotenv")
dotenv.config()


const client = require("./client.js")
const venue = require("./venue.js")
const organizer = require("./organizers.js")

//const SECRET_KEY ='secretkey'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json());
//app.use('/auth',userRouter)
app.use(express.static(path.join(__dirname, "build")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // Serve the React app's HTML file
});
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true
}))
app.use(cookieParser())


app.get("/",cors(),(req,res)=>{

})

// app.post("/addGig", async(req,res)=>{
//     try{
//         const {venue_id,venue_category,venue_location,venue_type,no_of_guests}=req.body

//         const newVenue = new venue({
//             venue_id,
//             venue_category,
//             venue_location,
//             venue_type,
//             no_of_guests  
//         })

//         await newVenue.save()
//         console.log("Got the data");
//         res.status(201).json({"message":"Venue created successfully"});
//     } catch (e) {
//         console.error(e); // Log the error details
//         res.status(404).json({"message":"Failed to create venue"});
//     } 

// })
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


app.post("/Login", async (req, res) => {
    const { client_username, client_password } = req.body;

    try {
        const validUser = await client.findOne({ client_username });
        console.log("valid User:", validUser);

        if (!validUser) {
            res.status(404).json({ "message": "User does not exist" });
        } else {
            const isPasswordValid = bcrypt.compareSync(client_password, validUser.client_password);
            if (isPasswordValid) {
                // If login is successful, return the validUser object
                res.status(200).json({ "userData": validUser });
            } else {
                res.status(401).json({ "message": "Invalid password" });
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
});
// CLIENT
app.post("/Login",async(req,res)=>{

    const{client_username,client_password}=req.body

    try{

        let validUser=await client.findOne({client_username})
        
        // console.log("valid USer: ",validUser);
        
        // console.log("valid USer Type: ",validUser.user_type);

        let hashPassword;
        if(validUser){
            hashPassword = bcrypt.compareSync(client_password,validUser.client_password)
            console.log("Password comparison result:", hashPassword);
        }


        if (!validUser) {
            validUser = await organizer.findOne({ organizer_username: client_username})
            if(validUser){
                hashPassword = bcrypt.compareSync(client_password,validUser.organizer_password)
                console.log("Password comparison result:", hashPassword);
            }
            else{
                res.json({status:false,"message":"User not Exist"})
            }
        }
        console.log("valid USer: ",validUser);
        if(!hashPassword){
            
             res.json({status:false,"message":"Wrong password!"})
        }
        // else{
        //      res.json({status:true,"message":"exist", "userData":validUser})
        // }

        
       
        
     
    
        const token = jwt.sign({id: validUser._id}, process.env.KEY, {expiresIn:'1hr'})   
        console.log("token from api ", token)
       
        return res.status(200).json({token , message:"Login Succesfull","userData":validUser })


        //res.cookie('token',token, {httpOnly:true, maxAge:3600000})

        // return res.json({ status: true, message: "Login Successful", redirect: "/home" });
        // return res.json({ status: true, message: "Login Successful", redirect: "/dashboard", user: validUser });
        
        
        
     
    }
    catch(e){
        res.json(e.message)
    }

})

app.get('/getAllGigs', async (req, res) => {
    const { city, category, venue } = req.body;
    try {
        let query = {};

        if (city) {
            query.city = city;
        }
        if (category) {
            query.category = category;
        }
        if (venue) {
            query.venue = venue;
        }

        const allGigs = await gig.find(query);
        res.json(allGigs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GETTIG ALL CLIENTS DATA
app.get('/getAllClientData', async (req,res)=>{

    try{
        const allCustomers = await client.find({},{client_password:0})
        res.status(200).json(allCustomers);
    }catch(err){
        res.status(404).json({message:err.message})
    }

})

// GETING ALL ORGANIZERS DATA
app.get('/getAllOrganizerData', async (req,res)=>{
    try{
        const allOrganizers = await organizer.find({},{organizer_password:0})
        res.status(200).json(allOrganizers);
    }catch(err){
        res.status(404).json({message:err.message})
    }

})




// User signup
app.post("/signup", async (req, res) => {

    const { name, email, userName, password, phone, accountType } = req.body;
        
    // console.log("user-type: ",userType)

    // if (!name || !email || !userName || !password || !phone || !accountType) {
    //     console.log("Missing fields:");
    //     console.log("name: ",name);
    //     console.log("email: ",email);
    //     console.log("usernam: ",userName);
    //     console.log("password: ",password);
    //     console.log("phone: ",phone);
    //     console.log("typpe: ",accountType);   
    // }

    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    
    //if(userType=="client"){

        const newClient = new client({
            client_name:name,
            client_email:email,
            client_username:userName,
            client_password: hashPassword,
            client_phone:phone,
            user_type:accountType
        });
    //}
    // else if(userType=="organizer"){

    //     const newOrganizer = new organizer({
    //         organizer_name:name,
    //         organizer_email:email,
    //         organizer_username:userName,
    //         organizer_password:password,
    //         organizer_phone:phone,
    //         user_type:userType

    //     });
    // }
    try {
       
            await newClient.save();
            console.log("client created successfully:", newClient);
            res.json({ status:true,"message": "Client created successfully" });
        
       
            
            // await newOrganizer.save();
            // console.log("Organizer created successfully:", newOrganizer);
            // res.status(201).json({ "message": "Organizer created successfully" });
        
        
    } catch (e) {
        console.error("Error during user creation:", e);
        res.status(404).json({ "message": "Internal server error" });
    }
});
app.post("/SignUp", async (req, res) => {

    const { name, email, userName, password, phone, accountType } = req.body;
        
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    try {
        if(accountType=="client"){

            const newClient = new client({
            client_name:name,
            client_email:email,
            client_username:userName,
            client_password: hashPassword,
            client_phone:phone,
            user_type:accountType
        });

        await newClient.save();
        console.log("client created successfully:", newClient);
        res.json({ status:true,"message": "Client created successfully" });
        
        }
        else if(accountType=="organizer"){

            const newOrganizer = new organizer({
                organizer_name:name,
                organizer_email:email,
                organizer_username:userName,
                organizer_password:hashPassword,
                organizer_phone:phone,
                user_type:accountType
            });

            await newOrganizer.save();
            console.log("Organizer created successfully:", newOrganizer);
            res.json({ status:true,"message": "Organizer created successfully" });
        } 
    } catch (e) {
        console.error("Error during user creation:", e);
        res.status(404).json({ "message": "Internal server error" });
    }
});
// MongoDB connection URI
const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3000;
    app.listen(3000, () =>{
        console.log("Server started on port 3000");
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = app;
