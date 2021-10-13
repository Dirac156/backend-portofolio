import { Router } from "express";
import { checkRole, checkAuth, Logout } from "../middleware/auth.js";
import { confirmWorkerEmailAddress, CreateWorker, GetWorkers, loginWorker, RejectWorker } from "../controller/workerController.js";
import { sessionHandler } from "../server.js";
import { CreateEmployer, confirmEmployerEmailAddress, GetEmployers, RejectEmployer, login } from "../controller/employerController.js";
import { createJobOpportunity, findJobByEmployer, findJobs } from "../controller/jobOpportunity.controller.js";
import { CandidateApplicationHistory, createJobApplication, findAllApplications, findApplicationsForJob, findCandidateProfilByStatus, findCandidatesProfil, selectCandidate } from "../controller/applicationController.js";

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

// applications

router.post("/job/application", sessionHandler, checkAuth, checkRole([ROLES.worker]), createJobApplication);

router.get("/job/application", sessionHandler, findAllApplications);

router.get("/job/application/candidates", sessionHandler, checkAuth, checkRole([ROLES.employer]), findCandidatesProfil);

router.get("/job/applications/candidates/status", sessionHandler, checkAuth, checkRole([ROLES.employer]), findCandidateProfilByStatus);

router.get("/job/applications/applications", sessionHandler, checkAuth, checkRole([ROLES.employer]), findApplicationsForJob);

router.get("/job/applications/candidates/history", sessionHandler, checkAuth, checkRole([ROLES.worker]), CandidateApplicationHistory);

router.put("/job/applications/candidates/select", sessionHandler, checkAuth, checkRole([ROLES.employer]), selectCandidate);


export default router;
