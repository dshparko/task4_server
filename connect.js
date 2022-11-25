import mysql from "mysql";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"aB2564221!q",
    database:"itra_task4"
})