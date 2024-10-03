require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')

const {MONGO_URL,PORT}=process.env;

const app = express();

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cors())
app.use(
    cors({
      origin: ["http://localhost:50424"],
      credentials: true,
      allowedHeaders: ['Authorization', 'Content-Type'],
    })
  );
// mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
mongoose.connect(MONGO_URL, {    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after a successful connection
    // app.listen(3001, () => {
    //     console.log("Server is running on port 3001");
    // });

    app.listen(PORT, () => {
        console.log("Server is running on port 3001");
    });
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});



// const collection=mongoose.model("collection",newSchema)

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number
});

const UserModel = mongoose.model("User", UserSchema);

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
    }
});


app.use(cookieParser());

app.use("/",authRoute);

// app.post("/login",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})
//         if(check){
//             res.json("exists")
//         }
//         else{
//             res.json("notexists")
//         }
//     }
//     catch(e){
//         res.json("notexists")
//     }
// })


// app.post("/login-signup",async(req,res)=>{
//     const{email,password}=req.body

//     const data={
//         email:email,
//         password:password
//     }

//     try{
//         const check=await collection.findOne({email:email})
//         if(check){
//             res.json("exists")
//         }
//         else{
//             res.json("notexists")
//             await collection.insertMany([data])
//         }
//     }
//     catch(e){
//         res.json("notexists")
//     }
// })