import express from "express";

const app = express();
import cors from "cors";

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

import multer from "multer";
import cookieParser from "cookie-parser";


//middlewares
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    })
);
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/server/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
app.use("/server/auth", authRoutes);
app.use("/server/users", userRoutes);


app.listen(8000, ()=>{
    console.log("Api working!")
})