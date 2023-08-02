const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const user = require("./routers/userRouter");
const port = process.env.PORT;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successfully ✌");
  })
  .catch((e) => {
    console.log("No connection 🥵");
  });
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", user);
app.get("/",async(req,res)=>{
  res.send("helo")
})

app.listen(port, () => console.log(`App listening on port ${port}.`));
