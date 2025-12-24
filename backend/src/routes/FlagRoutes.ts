import { Router } from "express";
import { FlagController } from "../controllers/FlagController";
import { FlagStore } from "../models/Flag";

const router = Router();
const flagStore = new FlagStore();
const flagController = new FlagController(flagStore);

router.post("/flags", flagController.flagPost);
router.get("/flags", flagController.getAllFlags);

export default router;
