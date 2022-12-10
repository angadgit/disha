

export default async function(req, res) {
  const {cookie} =req;
  const jwt = cookie.OursiteJWT;

  console.log(jwt);
  res.json({message: "success"});
}
