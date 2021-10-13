import mongoose from 'mongoose';

const jobOpportunitySchema = new mongoose.Schema({
    id: {type: String, required: true },
    employerId: {type: String, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true },
    skiils: { type: [], required: false},
    number: {type: Number, required: true },
    other: {type: String, required: false },
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false },
    amount: {type: Number, required: false },
    status: {type: String, required: true },
});

jobOpportunitySchema.statics.findJobByEmployer = async function(employerId) {
    console.log(employerId)
    const jobs = await this.find({employerId: employerId});
    return jobs;
}

export const jobOpportunity = mongoose.model('jobOpportunities', jobOpportunitySchema);
