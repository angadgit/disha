import { Schema, model, models } from 'mongoose';

const recepitSchema = new Schema({
  user: { type: String, required: true },
  recepitDate: { type: String, required: true },
  fullName: { type: String, required: true },
  contactPerson: { type: String },
  contactNumber: { type: Number },
  email: { type: String },
  pan: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  country: { type: String },
  state: { type: String },
  pinCode: { type: Number },
  funderType: { type: String },
  receiptAmount: { type: Number },
  typeFund: { type: String },
  description: { type: String },
})

const Recepit = models.recepit || model('recepit', recepitSchema);

export default Recepit;