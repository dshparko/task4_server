import express from "express";

const app = express();
import cors from "cors";

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
//middlewares
app.use(express.json());
app.use(cors())


app.use("/server/auth", authRoutes);
app.use("/server/users", userRoutes);


app.listen(3000, ()=>{
    console.log("Api working!")
})