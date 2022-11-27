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

export const deleteUser=(res,req)=>{
   console.log("delete")
}
export const blockUser=(res,req)=>{
   console.log("block")
}

export const unblockUser=(res,req)=>{
   console.log("hello")
}