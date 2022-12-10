import connectDb from "../../../middleware/mongoose";
import nc from "next-connect";
import User from "../../../model/UserSchema";
connectDb();

const handler = nc()
    .get(async (req, res) => {
        // console.log("api id get", req.query.id)
        try {
            const dt = await User.findById({ _id: req.query.id });
            res.status(200).json(dt)
        } catch (error) {
            console.log(error);
        }
    })
    .delete(async (req, res) => {
        try {
            await User.findByIdAndDelete({ _id: req.query.id });
            res.send("Deleted Success");
        } catch (error) {
            console.log(error);
        }
    })
    // .put(async (req, res) => {
    //     // console.log("api id get",req.query.id)
    //     try {
    //         const User = await User.findOne({ _id: req.query.id });
    //         User.user = req.body.user;
    //         User.UserName = req.body.UserName;
    //         User.contactPerson = req.body.contactPerson;
    //         User.contactNumber = req.body.contactNumber;
    //         User.email = req.body.email;
    //         User.pan = req.body.pan;
    //         User.UserType = req.body.UserType;
    //         User.UserCategory = req.body.UserCategory;
    //         User.addressLine1 = req.body.addressLine1;
    //         User.addressLine2 = req.body.addressLine2;
    //         User.country = req.body.country;
    //         User.state = req.body.state;
    //         User.pinCode = req.body.pinCode;
    //         User.nationality = req.body.nationality;
    //         User.website = req.body.website;
    //         await User.save();
    //         res.status(200).json({ success: "Success" })
    //     } catch (error) {
    //         res.status(400).json({ error: "This method is not allowed" })
    //     }
    // });

export default handler;
