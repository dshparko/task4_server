import {db} from "../connect.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken";


import moment from "moment";

const isValidEmail = email =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        if(!isValidEmail(req.body.email)){
            return res.status(500).json("Invalid email!");
        }

        if(req.body.password.length<0){
            return res.status(500).json("Password length must be >0!");
        }
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
            String(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")),
            String(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")),
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

export const login = (req, res) => {
    const q = `SELECT * FROM users WHERE email = ? AND status ='unblock'`;

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword) return res.status(400).json("Wrong password or email!");

        const token = jwt.sign({id: data[0].id}, "secretkey");
        const m = `UPDATE users SET lastLoginTime = NOW() WHERE id = ${data[0].id}`;
        db.query(m, (err, data) => {
            if (err) return console.error(err.message);
            console.log("Updated Row(s):", data.affectedRows);
        });
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
    console.log("Success log out");
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")

};

export const check = async (req,res)=>{
   // if (!req.cookies.accessToken) return res.status(200).json({ success: false, message: 'Not logged' })
    try {



        res.status(200).json({ success: true, data: "data" })
    } catch (err) {
        err.success = false
        res.status(404).json(err)
    }
}

