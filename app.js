import express, { urlencoded } from "express";
import router from "./routes/userroutes.js";
import session from "express-session";

const app =express()
app.use(express.urlencoded({extended:true}))
app.use(session({secret:"fz",resave:false,saveUninitialized:false}))


app.set("view engine","ejs")
app.use("/",router)

app.get("/",(req,res)=>{
    res.send("Welcome-All")
})


app.listen(3000,()=>console.log("Running..."))