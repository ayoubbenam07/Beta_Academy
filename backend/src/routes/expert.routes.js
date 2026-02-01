import express from "express";
import {
    getAllExperts,
    getExpertById,
    createExpert,
    updateExpert,
    deleteExpert,
} from "../controllers/expert.controller.js";

const router = express.Router();

router.get("/", getAllExperts);
router.get("/:id", getExpertById);
router.post("/", createExpert);
router.put("/:id", updateExpert);
router.delete("/:id", deleteExpert);

export default router;

