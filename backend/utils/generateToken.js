import jwt from 'jsonwebtoken';
const generateToken = (res,id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res.cookie('token', token, {
    expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    });

    return token;
}

export default generateToken;