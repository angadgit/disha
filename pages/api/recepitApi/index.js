// import connectMongo from '../../../database/conn'
// import { getRecepits, postRecepit, putRecepit, deleteRecepit } from '../../../database/recepitController';
// import Recepit from '../../../model/recepitSchema';

// export default async function handler(req, res) {
//   connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }))

//   // type of request
//   const { method } = req
//   // console.log(method)
//   switch (method) {
//     case 'GET':
//       getRecepits(req, res)
//       break;
//     case 'POST':
//       let b = new Recepit(req.body);
//       await b.save()
//       res.status(200).json({ success: "Success" })
//       break;
//     case 'PUT':
//       putRecepit(req, res)
//       break;
//     case 'DELETE':
//       deleteRecepit(req, res)
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowd`)
//       break;
//   }
// }

import connectDb from "../../../middleware/mongoose";
import recepitModel from "../../../model/recepitSchema"

const handler = async (req, res) => {
  if (req.method == 'POST') {
    // console.log(req.body)
    let b = new recepitModel(req.body);
    await b.save()
    res.status(200).json({ success: "Success" })
  }
  else if (req.method == 'GET') {
    // let funder = await Funder.find()
    res.status(200).json(await recepitModel.find());
  } else {
    res.status(400).json({ error: "This method is not allowed" })
  }

}

export default connectDb(handler)
