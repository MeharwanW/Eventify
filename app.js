const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import models
const client = require("./client.js");
const venue = require("./venue.js");
const organizer = require("./organizers.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // Serve the React app's HTML file
});

// Create new venue
app.post("/venues", async (req, res) => {
  try {
    const { venue_id, venue_category, venue_location, venue_type, no_of_guests } = req.body;
    const newVenue = new venue({
      venue_id,
      venue_category,
      venue_location,
      venue_type,
      no_of_guests  
    });
    await newVenue.save();
    console.log("Venue created successfully");
    res.status(201).json({ "message": "Venue created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Failed to create venue" });
  } 
});

// User login
app.post("/login", async (req, res) => {
  const { client_username, client_password } = req.body;
  try {
    const validUser = await client.findOne({ client_username });
    if (!validUser) {
      res.status(404).json({ "message": "User does not exist" });
    } else {
      const isPasswordValid = bcrypt.compareSync(client_password, validUser.client_password);
      if (isPasswordValid) {
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

// User signup
app.post("/signup", async (req, res) => {
  const { name, email, userName, password, phone, accountType } = req.body;
  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  const newClient = new client({
    client_name: name,
    client_email: email,
    client_username: userName,
    client_password: hashPassword,
    client_phone: phone,
    user_type: accountType
  });
  try {
    await newClient.save();
    console.log("Client created successfully:", newClient);
    res.json({ status: true, "message": "Client created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ "message": "Internal server error" });
  }
});

// MongoDB connection URI
const uri = "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = app;
