import { Router } from "express";
import { checkRole, checkAuth, Logout } from "../middleware/auth.js";
import { confirmWorkerEmailAddress, CreateWorker, GetWorkers, loginWorker, RejectWorker } from "../controller/workerController.js";
import { sessionHandler } from "../server.js";
import { CreateEmployer, confirmEmployerEmailAddress, GetEmployers, RejectEmployer, login } from "../controller/employerController.js";
import { createJobOpportunity, findJobByEmployer, findJobs } from "../controller/jobOpportunity.controller.js";

const ROLES = {
    employer: "EMPLOYER",
    worker: "WORKER"
}

const router = Router();

// logout

router.get("/logout", sessionHandler, checkAuth, checkRole([ROLES.employer, ROLES.worker]), Logout)

router.post("/employer", sessionHandler, CreateEmployer);

router.post("/employer/login", sessionHandler, login);

router.get("/employer", sessionHandler, GetEmployers);

router.delete("/employer/", sessionHandler, checkAuth, checkRole([ROLES.employer]), RejectEmployer);

router.get("/employer/email/validation/:token", sessionHandler, confirmEmployerEmailAddress);

// worker
router.post('/worker', sessionHandler, CreateWorker);

router.get("/worker/email/validation/:token", sessionHandler, confirmWorkerEmailAddress);

router.post("/worker/login", sessionHandler, loginWorker);

router.get("/worker", sessionHandler, GetWorkers);

router.delete("/worker/", sessionHandler, checkAuth, checkRole([ROLES.employer]), RejectWorker);

// job

router.get("/job/opportunity/", sessionHandler, checkAuth, checkRole([ROLES.employer, ROLES.worker]), findJobs);

router.get("/job/opportunity/employer", sessionHandler, checkAuth, checkRole([ROLES.employer]), findJobByEmployer);

router.post("/job/opportunity", sessionHandler, checkAuth, checkRole([ROLES.employer]), createJobOpportunity);


export default router;
