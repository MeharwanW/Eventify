
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
//var nodemailer = require('nodemailer');

const dotenv = require("dotenv")
dotenv.config()

//const userRouter = require("./routes/client.js")

const client = require("./models/client.js")
const venue = require("./models/venue.js")
const organizer = require("./models/organizers.js")

//const SECRET_KEY ='secretkey'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/auth',userRouter)
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true
}))
app.use(cookieParser())
app.use(bodyParser.json());


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

// // LOGGING ORGANIZER CONTROLLER
// app.post("/login/organizer",async(req,res)=>{

//     const{organizer_username,organizer_password}=req.body

//     try{

//     let validUser=await organizer.findOne({organizer_username})

//     if(!validUser){
//         res.json({status:false,"message":"User not Exist"})
//     }
        
//     const hashPassword = bcrypt.compareSync(organizer_password,validUser.organizer_password)

//     console.log("Password comparison result:", hashPassword);

//     if(!hashPassword){
            
//         return res.json({status:false,"message":"Wrong password!"})
//     }
//     else{
//        return  res.json({status:true,"message":"exist"})
//     }
//     //return res.json({status:true, message:"Login Succesfull" })
// }
// catch(e){
//     res.json(e.message)
// }

// })

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
            
            return res.json({status:false,"message":"Wrong password!"})
        }
        else{
            return res.json({status:true,"message":"exist"})
        }

        
       
        
        // let token;
        // if(validUser.user_type==='organizer'){
        //     token = jwt.sign({organizer_username: validUser.organizer_username}, process.env.KEY, {expiresIn:'1hr'})   
        // }
        // if(validUser.user_type==='client'){
        //     token = jwt.sign({client_username: validUser.client_username}, process.env.KEY, {expiresIn:'1hr'})
        // }

        // res.cookie('token',token, {httpOnly:true, maxAge:3600000})
        // return res.json({ status: true, message: "Login Successful", redirect: "/home" });
        // return res.json({ status: true, message: "Login Successful", redirect: "/dashboard", user: validUser });
        
        //return res.json({status:true, message:"Login Succesfull" })
        
     
    }
    catch(e){
        res.json(e.message)
    }

})

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


const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

//const mongoURI = process.env.MONGODB_URI
mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("MongoDB connected");
   // const PORT = process.env.PORT || 3000;
    app.listen(3000, () =>{
        console.log("port connected");
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});




