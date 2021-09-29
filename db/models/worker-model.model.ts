import { Schema, model } from 'mongoose';

// Worker data type
interface skills{
    skillName: string,
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    pastExperience: (string)[]
}

interface Worker{
    firstName: string,
    lastName: string,
    middleName?: string,
    phone:  string,
    confirmed: boolean,
    email: string,
    country: string,
    city: string,
    skills: skills,
};

// Worker mongodb schema
const WorkerSchema = new Schema<Worker>({
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

const WorkerModel = model<Worker>("worker", WorkerSchema);

export { Worker, WorkerSchema, WorkerModel }

