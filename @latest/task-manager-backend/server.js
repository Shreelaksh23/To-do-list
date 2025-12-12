const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app=express();
// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Database Connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>(console.log("MongoBD connected successfully")))
.catch((err)=>(console.log("MongoDB connection error:",err)))

// Test Route
app.get("/",(req,res)=>{
    res.send("Task Managet API is running...")
});

// Start Server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is running at port 5000");
})