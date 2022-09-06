import express from "express";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import mongoose from "mongoose";
import userRequests from "./routes/userRequest.js"
import dotenv from "dotenv/config"
// Connecting to TrackerDB
mongoose.connect(process.env.DB_CONNECT, ()=>{
  console.log("Connected to Database")
})

const app = express()

app.use(bodyParser.json())
// MiddleWares
app.use("/api/v1/users/requests", userRequests)
app.get("/", (req, res)=>{
  res.send("Home Page")
});

app.use(errors());

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running at Port ${PORT}`))

export default app;