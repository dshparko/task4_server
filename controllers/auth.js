import {db} from "../connect.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


import moment from "moment";
export const register = (req, res) => {
    //CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");
        //CREATE A NEW USER
        //Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q =
            "INSERT INTO users (`username`,`email`,`password`,`status`,`createTime`,`lastLoginTime`) VALUE (?)";

        const status = 'unblock';
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            status,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? AND status ='unblock'";

    db.query(q, [req.body.email], (err, data) => {


        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword) return res.status(400).json("Wrong password or email!");

        const token = jwt.sign({id: data[0].id}, "secretkey");

        const {password, ...others} = data[0];

        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);


    });

}


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
};


export const getUserInfo=(req,res)=>{

};