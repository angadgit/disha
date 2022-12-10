import { Schema, model, models } from 'mongoose';

const funderSchema = new Schema({
  user: { type: String, required: true },
  funderName: { type: String, required: true },
  contactPerson: { type: String },
  contactNumber: { type: Number },
  email: { type: String },
  pan: { type: String },
  funderType: { type: String },
  funderCategory: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  country: { type: String },
  state: { type: String },
  pinCode: { type: Number },
  nationality: { type: String },
  website: { type: String },
})

const Funder = models.funder || model('funder', funderSchema);

export default Funder;