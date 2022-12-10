import { Schema, model, models } from 'mongoose';

const fundTypeSchema = new Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
})

const fundType = models.fundType || model('fundType', fundTypeSchema);

export default fundType;