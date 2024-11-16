import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.jwt;
  // console.log({token})
  if (!token) return res.status(401).send("You are not authenticated !");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return response.status(403).send("Invalid Token");
    req.userId = payload.userId;
    next();
  });
};
