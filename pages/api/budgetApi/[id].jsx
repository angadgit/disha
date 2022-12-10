import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import budget from "../../../model/budgetModel";
connectDb();

const handler = nc()
  .get(async (req, res) => {
    try {
      const dt = await budget.findById({ _id: req.query.id });
      res.status(200).json(dt);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      await budget.findByIdAndDelete({ _id: req.query.id });
      res.send("Deleted Success");
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    try {
      const dt = await budget.findById({ _id: req.query.id });
      dt.user = req.body.user;
      dt.funderName = req.body.funderName;
      dt.projectName = req.body.projectName;
      dt.programName = req.body.programName;
      dt.programRemark = req.body.programRemark;
      dt.activityName = req.body.activityName;
      dt.activityRemark = req.body.activityRemark;
      dt.item = req.body.item;
      await dt.save();
      res.status(200).json({ success: "Success" });
    } catch (error) {
      res.status(400).json({ error: "This method is not allowed" });
    }
  });

export default handler;
