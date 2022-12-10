
import connectMongo from '../../../database/conn';
import Users from '../../../model/UserSchema'
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  connectMongo().catch(error => res.json({ message: "Connection Failed...!" }))

  // only post method is accepted
  if (req.method === 'POST') {
    // console.log(req.body)
    if (!req.body) return res.status(404).json({ message: "Don't have form data...!" });
    const { createdBy,
      name,
      email,
      logo,
      department,
      mobileNo,
      addressLine1,
      addressLine2,
      country,
      state,
      pinCode,
      userRole,
      access,
      formPermission,
      userName,
      password } = req.body;

    // check duplicate users
    const checkexisting = await Users.findOne({ email });
    if (checkexisting) return res.status(422).json({ message: "User Email Already Exists...!" });

    // hash password
    // password: await hash(password, 12)
    Users.create({
      createdBy,
      name,
      email,
      logo,
      department,
      mobileNo,
      addressLine1,
      addressLine2,
      country,
      state,
      pinCode,
      userRole,
      access,
      formPermission,
      userName,
      password: await hash(password, 12)
    }, function (errors, data) {
      if (errors) return res.status(404).json({ message: "UserName Already Exists...!" } );
      res.status(201).json({ message: "User Created success...!", status: true, user: data })
    })
  } else {
    res.status(500).json({ message: "HTTP method not valid only POST Accepted" })
  }

}