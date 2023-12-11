import express from "express";
import { getSystemData, insertSystemData } from "../controllers/client.js"


const router = express.Router();

router.get("/systemdata", getSystemData);
router.get("/insertdata")
router.post("/systemdata", insertSystemData);
export default router