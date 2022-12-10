import { Schema, model, models } from 'mongoose';

const companyProfileSchema = new Schema({
  user: { type: String, required: true },
  logo: { type: String },
  name: { type: String, required: true },
  email: { type: String },
  pan: { type: String },
  officeNo: { type: Number },
  mobileNo: { type: Number },
  addressLine1: { type: String },
  addressLine2: { type: String },
  country: { type: String },
  state: { type: String },
  pinCode: { type: Number },
  twelveA: { type: String },
  eightyG: { type: String },
  organizationType: { type: String },
  organizationRegistrationNo: { type: String },
})

const companyProfile = models.companyProfile || model('companyProfile', companyProfileSchema);

export default companyProfile;