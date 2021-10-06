import { Schema, model } from 'mongoose';

// creat employee data type.

interface skills{
    skillname: string,
    level: 'BIGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    pastExperience: (string)[]
}

interface Employer {
    firstName: string,
    lastName: string,
    middleName?: string, 
    phone: string,
    confirmed: boolean,
    email: string,
    country: string,
    city: string,
    user: string,
    confirmationToken: string,
    resetToken: string,
};

// employee mongodb schema
const EmployerSchema = new Schema<Employer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: true },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    user: { type: String, required: true},
    confirmationToken: {type: String, required: true },
    resetToken: { type: String, required: true }
});

const EmployerModel = model<Employer>("employers", EmployerSchema);

export { Employer, EmployerSchema, EmployerModel }