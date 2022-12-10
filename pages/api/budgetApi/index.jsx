import connectDb from "../../../middleware/mongoose";
import budget from "../../../model/budgetModel";

const handler = async (req, res) => {
  // console.log(req.body)
  try {
    if (req.method == "POST") {
      let b = new budget(req.body);
      await b.save();
      res.status(200).json({ success: "Success" });
    } else if (req.method == "GET") {
      // let funder = await Funder.find()
      res.status(200).json(await budget.find());
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDb(handler);
