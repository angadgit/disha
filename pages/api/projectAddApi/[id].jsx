import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import ProjectManage from "../../../model/projectAddModel";
connectDb();

const handler = nc()
  .get(async (req, res) => {
    // console.log("api id get", req.query.id)
    try {
      const dt = await ProjectManage.findById({ _id: req.query.id });
      res.status(200).json(dt);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      await ProjectManage.findByIdAndDelete({ _id: req.query.id });
      res.send("Deleted Success");
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    // console.log("api id get",req.query.id)
    try {
      const dt = await ProjectManage.findOne({ _id: req.query.id });
      dt.user = req.body.user;
      dt.projectName = req.body.projectName;
      dt.funder = req.body.funder;
      dt.startingDate = req.body.startingDate;
      dt.endingDate = req.body.endingDate;
      dt.workArea = req.body.workArea;
      dt.budgetAmount = req.body.budgetAmount;
      await dt.save();
      res.status(200).json({ success: "Success" });
    } catch (error) {
      res.status(400).json({ error: "This method is not allowed" });
    }
  });

export default handler;
