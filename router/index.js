import { Router } from "express";
import { CreateWorker } from "../controller/workerController.js";
import { sessionHandler } from "../server.js";
import { CreateEmployer, confirmEmployerEmailAddress, GetEmployers, RejectEmployer, login } from "../controller/employerController.js";

const router = Router();

router.post("/employer", sessionHandler, CreateEmployer);

router.post("/employer/login", sessionHandler, login);

router.get("/employer", sessionHandler, GetEmployers);

router.delete("/employer/", sessionHandler, RejectEmployer);

router.get("/email/validation/:token", sessionHandler, confirmEmployerEmailAddress);

router.post('/worker', sessionHandler, CreateWorker);


export default router;
