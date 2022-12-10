import { Schema, model, models } from "mongoose";

const budgetModel = new Schema({
  user: { type: String, required: true },
  funderName: { type: String },
  projectName: { type: String },
  programName: { type: String },
  programRemark: { type: String },
  activityName: { type: String },
  activityRemark: { type: String },
  item: [],
});

const budget = models.budget || model("budget", budgetModel);

export default budget;
