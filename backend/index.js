const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv").config()
const authRoutes = require("./src/routes/authRoutes")
const userRouter = require("./src/routes/userRoute")
const dbConnect = require("./src/config/dbConnect")
const managerRouter = require("./src/routes/managerRoute")

const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//mongo
dbConnect();

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRouter);
app.use("/api/managers",managerRouter);

//server
const PORT = process.env.PORT || 8000;//if env is not defined
app.listen(PORT , ()=>{
    console.log(`Server is running in port ${PORT} `)
})