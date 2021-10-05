import { Router } from "express";
import { CreateEmployer } from "../controller/employerController";

const router = Router();

router.post("/employer", CreateEmployer);

export default router;
