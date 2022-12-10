import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    createdBy: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    logo: { type: String },
    department: { type: String },
    mobileNo: { type: Number },
    addressLine1: { type: String },
    addressLine2: { type: String },
    country: { type: String },
    state: { type: String },
    pinCode: { type: Number },
    userRole: { type: String },
    access: [],
    formPermission: [],
    userName: { type: String },
    password: { type: String },
})

const Users = models.user || model('user', userSchema);

export default Users;