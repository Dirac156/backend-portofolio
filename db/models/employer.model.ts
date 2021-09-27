import { Schema, model } from 'mongoose';

// creat employee data type.

interface skills{
    skillname: string,
    level: 'BIGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    pastExperience: (string)[]
}

interface Employee {
    firstName: string,
    lastName: string,
    middleName?: string, 
    phone: string,
    confirmed: boolean,
    email: string,
    country: string,
    city: string,
    skills: skills,
};

// employee mongodb schema

const EmployeeSchema = new Schema<Employee>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: true },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    skills: {
        skillname: { type: String, required: true },
        level: { 
            type: String,
            required: true,
            enum: {
                values: ['BIGINNER', 'INTERMEDIATE', 'ADVANCED'],
                message: "{VALUE} not accepted"
            }
        }
    }
});

const EmployeeModel = model<Employee>("employee", EmployeeSchema);

export { Employee, EmployeeSchema, EmployeeModel }
