import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    level: { type: String, required: true },
    pastExperience: [],
})

const skillsModel = mongoose.model("skills", skillsSchema);

// Worker mongodb schema
const WorkerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: false },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    country: { type: String, required: true },
    city: { type: String, required: true },
    skills: { type: [], required: true},
    confirmationToken: { type: String, required: true },
    resetToken: { type: String, required: true }
});

const WorkerModel = mongoose.model("worker", WorkerSchema);

export { WorkerModel, skillsModel }

