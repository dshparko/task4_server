import {db} from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser=(req,res)=>{

   const q = "SELECT * FROM users";
   db.query(q,(err,result)=>{
      if(err){
         res.status(422).json("nodata available");
      }else{
         res.status(201).json(result);
      }
   })

}

export const deleteUser=(req,res)=>{
   const  {id}  = req.params;
  // console.log(id);
   const q = `DELETE FROM users WHERE id = ${id}`;

   db.query(q, (err, data) => {
      if (err) return console.error(err.message);
      res.status(200).send(data);
     console.log("Deleted Row(s):", data.affectedRows);

   });


}
export const blockUser=(req,res)=>{
   const { id } = req.params;



   const q = `UPDATE users SET status='block' WHERE id = ${id}`;
   db.query(q, (err, data) => {
      if (err) return console.error(err.message);
      res.status(200).send(data);
      console.log("Updated Row(s):", data.affectedRows);

   });
}

export const unblockUser=(req,res)=>{
    const { id } = req.params;

    const q = `UPDATE users SET status='unblock' WHERE id = ${id}`;
    db.query(q, (err, data) => {
        if (err) return console.error(err.message);
        res.status(200).send(data);
        console.log("Updated Row(s):", data.affectedRows);

    });
}