const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User3 = require("./model/userschema3");
const port = process.env.PORT || 5000;
require("dotenv").config();
const DB = process.env.DATABASE;
const cors = require("cors");
app.use(cors("*"));
const jwt = require("jsonwebtoken")


mongoose
  .connect(DB)
  .then(() => {
    console.log("sucess done");
  })
  .catch(() => {
    console.log("error");
  });



app.use(express.json());

app.listen(port, () => {
  console.log("listening at port 5000");
});

app.use(middleware)
app.use(middleware1)

app.get("/", (req, res) => {
  console.log("vishal")
  res.send("This is MY Server");
});




app.post("/add3", async (req, res) => {
  const { name,password } = req.body;
  if (!password || !name) {
    return res.status(400).send("bad request");
  } else {
    const user3 = new User3({
      password: password ,
      name: name,
    });
    await user3.save();
    return res.status(200).send("done");
  }
});
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const data = await User3.find({ name: name, password: password });
  if (data.length !== 0) {
    const token = jwt.sign({name, password}, "thisismykey", {
      expiresIn:"2h"
    })
    return res.status(200).json({...data, token:token});
  } else {
    return res.status(400).send("no user");
  }
});
function authorize(req,res,next){
  const token = req.headers["user-token"]
  console.log(token)
  const response = jwt.verify(token, "thisismykey")
  console.log(response)
  next()
}
app.get("/getdata", authorize, (req,res)=>{
  res.status(200).json({n1:23,n2:"hi"})
})
function middleware(req,res,next){
  console.log("hi")
  next()
}
function middleware1(req,res,next){
  console.log("hi1")
  next()
  console.log("byygh")
}