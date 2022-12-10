import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import Funder from "../../../model/funderSchema";
connectDb();

const handler = nc()
    .get(async (req, res) => {
        // console.log("api id get", req.query.id)
        try {
            const dt = await Funder.findById({ _id: req.query.id });
            res.status(200).json(dt)
        } catch (error) {
            console.log(error);
        }
    })
    .delete(async (req, res) => {
        try {
            await Funder.findByIdAndDelete({ _id: req.query.id });
            res.send("Deleted Success");
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        // console.log("api id get",req.query.id)
        try {
            const funder = await Funder.findOne({ _id: req.query.id });
            funder.user = req.body.user;
            funder.funderName = req.body.funderName;
            funder.contactPerson = req.body.contactPerson;
            funder.contactNumber = req.body.contactNumber;
            funder.email = req.body.email;
            funder.pan = req.body.pan;
            funder.funderType = req.body.funderType;
            funder.funderCategory = req.body.funderCategory;
            funder.addressLine1 = req.body.addressLine1;
            funder.addressLine2 = req.body.addressLine2;
            funder.country = req.body.country;
            funder.state = req.body.state;
            funder.pinCode = req.body.pinCode;
            funder.nationality = req.body.nationality;
            funder.website = req.body.website;
            await funder.save();
            res.status(200).json({ success: "Success" })
        } catch (error) {
            res.status(400).json({ error: "This method is not allowed" })
        }
    });

export default handler;
