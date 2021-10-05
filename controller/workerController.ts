/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as WorkerService from './Workers.service';
// import Worker from './worker-model.model'

class WorkerController {
    public path = '/workers';
    public router = express.Router();

    private workers: Worker[] = [
        
    ];

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllWorkers);
        this.router.post(this.path, this.createAWorker);
        this.router.patch(this.path, this.updateAWorker);
        this.router.delete(this.path, this.deleteAWorker);
    }

    getAllWorkers = async (request: express.Request, response: express.Response) => {
        try {
            const workers: Worker[] = await WorkerService.findAll();

            response.status(200).send(workers);

        } catch(error) {

            response.status(500).send(error);
        }
        response.send(this.workers);
    }

    createAWorker = (request: express.Request, response: express.Response) => {
        const worker: Worker = request.body;
        this.workers.push(worker);
        response.send(worker);
    }

    updateAWorker = (request: express.Request, response: express.Response) => {
        const worker: Worker = request.body;
        this.workers.push(worker);
        response.send(worker);
    }

    deleteAWorker = (request: express.Request, response: express.Response) => {
        response.send(this.workers)
    }
}

export default WorkerController;