import { Schema, model } from 'mongoose';

// Job data type
const Job = {
    jobName: "job",
    description: "desc",
    pricePerHour: "price",
    
};

// Job mongodb schema
const JobSchema = new Schema({
    jobName: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: String, required: true }
})