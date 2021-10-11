import mongoose from 'mongoose';

// creat employee data type.

// employee mongodb schema
const EmployerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: true },
    confirmed: { type: Boolean, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    country: { type: String, required: true },
    city: { type: String, required: true },
    user: { type: String, required: true},
    confirmationToken: {type: String, required: true },
    resetToken: { type: String, required: true }
});

const EmployerModel = mongoose.model("employers", EmployerSchema);

export { EmployerModel }
