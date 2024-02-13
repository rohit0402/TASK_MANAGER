const mongoose=require("mongoose");

const connection=async (req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://rohit123sonar:KdLLQwO5b3qA04eh@cluster0.xanp80v.mongodb.net/").then(() => {
            console.log("connected db");
        });
    } catch (error) {
        console.error("Connection error: DB", error);
        res.status(500).send("Failed to connect to the database");
        //res.status(500).json({message: "fail to connect"});
    }
    
};
connection();