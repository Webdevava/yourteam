import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Log the payload for debugging
  console.log("Token payload:", jwt.decode(token));

  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
