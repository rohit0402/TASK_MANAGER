const express= require("express");
const app=express();
const auth =require("./routes/auth.js");
const list =require("./routes/list.js");
const cors= require("cors");
const path=require("path");

require("./connection/connection.js");
app.listen(1000,()=>{
    console.log("connected server");
});

app.use(express.json());
app.use(cors());
app.use("/api/v1",auth);
app.use("/api/v2",list);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.get("/",(req,res)=>{
    res.send("hello");
});