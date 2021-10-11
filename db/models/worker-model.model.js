import { Schema, model } from 'mongoose';

// Worker mongodb schema
const WorkerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: true },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    skills: {
        skillName: { type: String, required: true },
        level: {
            type: String,
            required: true,
            enum: {
                values: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
                message: "{VALUE} is not supported"
            }
        }
    }

});

const WorkerModel = model("worker", WorkerSchema);

export { WorkerModel }

