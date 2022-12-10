import connectDb from "../../../middleware/mongoose";
import projectModels from "../../../model/projectAddModel"

const handler = async (req, res) => {

  try {

    if (req.method == 'POST') {
      // console.log(req.body)
      let b = new projectModels(req.body);
      await b.save()
      res.status(200).json({ success: "Success" })
    }
    else if (req.method == 'GET') {
      // let funder = await Funder.find()
      res.status(200).json(await projectModels.find());
    } else {
      res.status(400).json({ error: "This method is not allowed" })
    }

  } catch (error) {
    console.log(error)
  }

}

export default connectDb(handler)