import connectDb from "../../../middleware/mongoose";
import funderModel from "../../../model/funderSchema"

const handler = async (req, res) => {
  if (req.method == 'POST') {
    // console.log(req.body)
    let b = new funderModel(req.body);
    await b.save()
    res.status(200).json({ success: "Success" })
  }
  else if (req.method == 'GET') {
    // let funder = await Funder.find()
    res.status(200).json(await funderModel.find());
  } else {
    res.status(400).json({ error: "This method is not allowed" })
  }

}

export default connectDb(handler)
