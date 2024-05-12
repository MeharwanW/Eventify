const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const { verifyToken } = require("./middleWare/auth.js");

// Multer importss
const multer = require("multer");

// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

//var nodemailer = require('nodemailer');

const dotenv = require("dotenv");
dotenv.config();

const client = require("./models/client.js");
const gig = require("./models/gig.js");
const organizer = require("./models/organizers.js");
const order = require("./models/order.js");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     credentials:true
// }))
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});





app.get("/all/orders", async (req, res) => {
  try {
    let organizer_id = "788";
    const allOrganizers = await order.find({ organizer_id });
    if (allOrganizers) {
      res.json({ status: true, allOrganizers });
    } else {
      res.json({ status: false, message: "User not Exist" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.post("/book/event", async (req, res) => {
  try {
    //no_ofguests
    const { client_id, category, venue, city, state1, services, no_of_guest } =
      req.body;

    console.log("req.body: ", req.body);

    const findGig = await gig.findOne({
      category: "Wedding",
      venue: "Dolphin",
      city: "Sukkur",
      no_of_guest: { $gte: no_of_guest },
    });

    console.log("Gig Object from app,js ", findGig);

    if (!findGig) {
      return res
        .status(400)
        .json({ message: "No Organizer provide this service" });
    }

    console.log("Gig Id of Order", findGig._id);
    console.log("Orgaanizer Id of Order", findGig.organizer_id);

    const newOrder = new order({
      client_id: "663a7e97b5098afc83e15903",
      category,
      // event_date,
      venue,
      city,
      state1,
      services: [services],
      no_of_guest: 180,
      total_cost: 150000,
      total_cost: findGig.total_cost,
      payment_status: "cash on delivery",
      gig_id: "738632082",
      organizer_id: "dsjdn",
      gig_id: findGig._id,
      organizer_id: findGig.organizer_id,
    });

    console.log("newOrder : ", newOrder);

    await newOrder.save();
    //console.log("Order created: Wait for organizer response", newOrder);
    res.json({ status: true, message: "Order placed successfully" });
  } catch (e) {
    console.error("Error during order creation:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/1");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/addGig", upload.single("image"), verifyToken, async (req, res) => {
  try {
    const {
      organizer_id,
      description,
      venue,
      category,
      city,
      state1,
      services,
    } = req.body;
    console.log("reqbody", req.body);
    const servicesArray = JSON.parse(services);
    console.log("servicesArray", servicesArray);
    const newGig = new gig({
      organizer_id,
      description,
      venue,
      category,
      services_list: servicesArray,
      no_of_guest: 200,
      total_cost: 1500000,
      city,
      state1,
      image: req.file.filename, // Store the file path in the image field
    });

    console.log(newGig);
    await newGig.save();

    res.status(201).json({ message: "Gig created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//GETTIG ALL CLIENTS DATA
app.get("/getAllClientData", async (req, res) => {
  try {
    const allCustomers = await client.find({}, { client_password: 0 });
    res.status(200).json(allCustomers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//GETING ALL ORGANIZERS DATA
app.get("/getAllOrganizerData", async (req, res) => {
  try {
    const allOrganizers = await organizer.find({}, { organizer_password: 0 });
    res.status(200).json(allOrganizers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/getAllGigs", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { client_username, client_password } = req.body;

  try {
    let validUser = await client.findOne({ client_username });

    let hashPassword;
    if (validUser) {
      hashPassword = bcrypt.compareSync(
        client_password,
        validUser.client_password
      );
      console.log("Password comparison result:", hashPassword);
    }

    if (!validUser) {
      validUser = await organizer.findOne({
        organizer_username: client_username,
      });
      if (validUser) {
        hashPassword = bcrypt.compareSync(
          client_password,
          validUser.organizer_password
        );
        console.log("Password comparison result:", hashPassword);
      } else {
        res.json({ status: false, message: "User not Exist" });
      }
    }
    console.log("valid USer login: ", validUser);
    if (!hashPassword) {
      res.json({ status: false, message: "Wrong password!" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.KEY, {
      expiresIn: "1hr",
    });
    console.log("token from login api ", token);
    if (validUser.user_type == "organizer") {
      return res
        .status(200)
        .json({
          token,
          message: "Login Succesfull",
          userData: validUser,
          userType: "organizer",
        });
    }
    return res
      .status(200)
      .json({
        token,
        message: "Login Succesfull",
        userData: validUser,
        userType: "client",
      });
  } catch (e) {
    res.json(e.message);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, userName, password, phone, accountType } = req.body;

  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  try {
    if (accountType == "client") {
      const newClient = new client({
        client_name: name,
        client_email: email,
        client_username: userName,
        client_password: hashPassword,
        client_phone: phone,
        user_type: accountType,
      });

      await newClient.save();
      console.log("client created successfully:", newClient);
      res.json({ status: true, message: "Client created successfully" });
    } else if (accountType == "organizer") {
      const newOrganizer = new organizer({
        organizer_name: name,
        organizer_email: email,
        organizer_username: userName,
        organizer_password: hashPassword,
        organizer_phone: phone,
        user_type: accountType,
      });

      await newOrganizer.save();
      console.log("Organizer created successfully:", newOrganizer);
      res.json({ status: true, message: "Organizer created successfully" });
    }
  } catch (e) {
    console.error("Error during user creation:", e);
    res.status(404).json({ message: "Internal server error" });
  }
});

// MongoDB connection URI
const uri =
  "mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=Eventify-Backend";

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    //const PORT = process.env.PORT || 3000;
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = app;
