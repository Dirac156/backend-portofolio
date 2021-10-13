import { Schema, model } from 'mongoose';

const JobApplicationSchema = new Schema ({
    jobId: { type: String, required: true},
    workerId: { type: String, required: true},
    document: { type: String, required: true},
});

const JobApplicationModel = model('job_application', JobApplicationSchema);

export { JobApplicationModel };
