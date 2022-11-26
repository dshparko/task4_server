import express from "express";
import {blockUser, deleteUser, getUser, unblockUser} from "../controllers/user.js";

const router = express.Router();

router.get("/test",getUser);

router.get('/data', getUser);
router.delete('/delete/:id',deleteUser);
router.patch('/block/:id', blockUser);
router.patch('/unblock/:id', unblockUser);

export default router;