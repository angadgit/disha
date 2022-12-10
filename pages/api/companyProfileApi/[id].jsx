import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import CompanyProfile from "../../../model/companyProfile";
connectDb();

const handler = nc()
    .get(async (req, res) => {
        try {
            const dt = await CompanyProfile.findById({ _id: req.query.id });
            res.status(200).json(dt)
        } catch (error) {
            console.log(error);
        }
    })
    .delete(async (req, res) => {
        try {
            await CompanyProfile.findByIdAndDelete({ _id: req.query.id });
            res.send("Deleted Success");
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        // console.log("api id get",req.query.id)
        // console.log(req.body)
        // const dt = await CompanyProfile.findById({ _id: req.query.id });
        // console.log(dt)
        try {
            const dt = await CompanyProfile.findById({ _id: req.query.id });
        // console.log(dt)
            dt.user = req.body.user;
            dt.logo = req.body.logo;
            dt.name = req.body.name;
            dt.email = req.body.email;
            dt.pan = req.body.pan;
            dt.addressLine1 = req.body.addressLine1;
            dt.addressLine2 = req.body.addressLine2;
            dt.country = req.body.country;
            dt.state = req.body.state;
            dt.pinCode = req.body.pinCode;
            dt.officeNo = req.body.officeNo;
            dt.mobileNo = req.body.mobileNo;
            dt.twelveA = req.body.twelveA;
            dt.eightyG = req.body.eightyG;
            dt.organizationType = req.body.organizationType;
            dt.organizationRegistrationNo = req.body.organizationRegistrationNo;
            await dt.save();
            res.status(200).json({ success: "Success" })
        } catch (error) {
            res.status(400).json({ error: "This method is not allowed" })
        }
    });

export default handler;
