import connectDb from "../../../middleware/mongoose";
import Users from "../../../model/UserSchema"

const handler = async (req, res) => {
  if (req.method == 'POST') {
    res.status(400).json({ error: "This method is not allowed" })
  }
  else if (req.method == 'GET') {
    res.status(200).json(await Users.find());
  } else {
    res.status(400).json({ error: "This method is not allowed" })
  }

}

export default connectDb(handler)
