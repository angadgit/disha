import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import Recepit from "../../../model/recepitSchema";
connectDb();

const handler = nc()
    .get(async (req, res) => {
        // console.log("api id get", req.query.id)
        try {
            const dt = await Recepit.findById({ _id: req.query.id });
            res.status(200).json(dt)
        } catch (error) {
            console.log(error);
        }
    })
    .delete(async (req, res) => {
        try {
            await Recepit.findByIdAndDelete({ _id: req.query.id });
            res.send("Deleted Success");
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        // console.log("api id get",req.query.id)
        try {
            const recepit = await Recepit.findOne({ _id: req.query.id });
            recepit.user = req.body.user;
            recepit.recepitDate = req.body.recepitDate;
            recepit.fullName = req.body.fullName;
            recepit.contactPerson = req.body.contactPerson;
            recepit.contactNumber = req.body.contactNumber;
            recepit.email = req.body.email;
            recepit.pan = req.body.pan;
            recepit.addressLine1 = req.body.addressLine1;
            recepit.addressLine2 = req.body.addressLine2;
            recepit.country = req.body.country;
            recepit.state = req.body.state;
            recepit.pinCode = req.body.pinCode;
            recepit.funderType = req.body.funderType;
            recepit.receiptAmount = req.body.receiptAmount;
            recepit.typeFund = req.body.typeFund;
            recepit.description = req.body.description;
            await recepit.save();
            res.status(200).json({ success: "Success" })
        } catch (error) {
            res.status(400).json({ error: "This method is not allowed" })
        }
    });

export default handler;
