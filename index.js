import Express from "express";

const app = Express();


import userRoutes from './routes/users.js'

app.use("/server/users",userRoutes)

app.listen(3000, ()=>{
    console.log("Api working!")
})