import jwt from 'jsonwebtoken';
const generateToken = (res,id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res.cookie("token", token, {
    httpOnly: true, 
    secure: true,  
    maxAge: 3600 * 1000,
    sameSite: "None",
  });
  
  

    return token;
}

export default generateToken;