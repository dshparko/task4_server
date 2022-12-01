import {db} from "../connect.js";

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
    console.log(req.params);
   const  id  = req.params.id;
   const q = "DELETE FROM users WHERE id = ?";

   db.query(q,[id], (err, data) => {
      if (err) return console.error(err.message);

       console.log("Deleted Row(s):", data.affectedRows);
       res.status(200).send(data);

   });


}
export const blockUser=(req,res)=>{
   const  id = req.params.id;

   const q = "UPDATE users SET status='block' WHERE id = ?";
   db.query(q, [id],(err, data) => {
      if (err) return console.error(err.message);
      res.status(200).send(data);
      console.log("Updated Row(s):", data.affectedRows);

   });
}

export const unblockUser=(req,res)=>{
    const  id  = req.params.id;

    const q = `UPDATE users SET status='unblock' WHERE id = ?`;
    db.query(q,[id], (err, data) => {
        if (err) return console.error(err.message);
        res.status(200).send(data);
        console.log("Updated Row(s):", data.affectedRows);

    });
}