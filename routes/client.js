// const express = require("express")
// const bcrypt = require("bcryptjs")

// const router = express.Router();


// const client = require("./models/client.js")
// const organizer = require("./models/organizers.js")
// router.post('/SignUp', (req,res)=>{
//     const {name,email,userName,password,phone,accountType}=req.body

//     const saltRounds = 10;
//     const hashPassword = bcrypt.hashSync(password, saltRounds);

//     //try {
//         if(accountType=="client"){

//             const newClient = new client({
//             client_name:name,
//             client_email:email,
//             client_username:userName,
//             client_password: hashPassword,
//             client_phone:phone,
//             user_type:accountType
//         });

//         await newClient.save();
//         console.log("client created successfully:", newClient);
//         res.json({ status:true,"message": "Client created successfully" });
        
//         }
//         else if(accountType=="organizer"){

//             const newOrganizer = new organizer({
//                 organizer_name:name,
//                 organizer_email:email,
//                 organizer_username:userName,
//                 organizer_password:hashPassword,
//                 organizer_phone:phone,
//                 user_type:accountType
//             });

//             await newOrganizer.save();
//             console.log("Organizer created successfully:", newOrganizer);
//             res.json({ status:true,"message": "Organizer created successfully" });
//         } 
//     //} catch (e) {
//     //    console.error("Error during user creation:", e);
//     //    res.status(404).json({ "message": "Internal server error" });
//     //}
// })




// export {router as userRouter}