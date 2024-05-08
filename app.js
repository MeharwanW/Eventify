
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
//const jwt = require("jsonwebtoken")

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


app.post("/SignUp", async (req, res) => {

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


const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

//const mongoURI = process.env.MONGODB_URI
mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3000;
    app.listen(3000, () =>{
        console.log("port connected");
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});




