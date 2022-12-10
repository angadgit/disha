import { Schema, model, models } from "mongoose";

const projectAddModel = new Schema({
  user: { type: String, required: true },
  projectName: { type: String, required: true },
  funder: { type: String, required: true },
  startingDate: { type: String, required: true },
  endingDate: { type: String, required: true },
  workArea: { type: String },
  budgetAmount: { type: Number, required: true },
});

const projectAdd = models.projectAdd || model("projectAdd", projectAddModel);

export default projectAdd;
