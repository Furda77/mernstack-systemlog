import express from "express";
import { getOverview } from "../controllers/overview.js";

const router = express.Router();

router.get("/", getOverview); // Change the route to handle GET requests to /

export default router;
