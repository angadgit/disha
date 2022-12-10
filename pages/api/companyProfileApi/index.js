import connectDb from "../../../middleware/mongoose";
import companyProfileModel from "../../../model/companyProfile"

const handler = async (req, res) => {
  if (req.method == 'POST') {
    // console.log(req.body)
    let b = new companyProfileModel(req.body);
    await b.save()
    res.status(200).json({ success: "Success" })
  }
  else if (req.method == 'GET') {
    // let funder = await Funder.find()
    res.status(200).json(await companyProfileModel.find());
  } else {
    res.status(400).json({ error: "This method is not allowed" })
  }

}

export default connectDb(handler)