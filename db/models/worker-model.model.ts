import { Schema, model } from 'mongoose';

// Worker data type
interface skills{
    skillName: string,
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    pastExperience: (string)[]
}

const skillsSchema = new Schema<skills>({
    skillName: { type: String, required: true },
    level: { type: String, required: true },
    pastExperience: [],
})

const skillsModel = model<skills>("skills", skillsSchema);

interface Worker{
    firstName: string,
    lastName: string,
    middleName?: string,
    phone?:  string,
    confirmed: boolean,
    email: string,
    password: string,
    country: string,
    city: string,
    skills: (skills)[],
};

// Worker mongodb schema
const WorkerSchema = new Schema<Worker>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: false },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    country: { type: String, required: true },
    city: { type: String, required: true },
    skills: { type: [], required: true}
});

const WorkerModel = model<Worker>("worker", WorkerSchema);

export { Worker, WorkerSchema, WorkerModel, skillsModel, skillsSchema, skills }

