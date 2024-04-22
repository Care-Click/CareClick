const prisma = require("../db/prisma");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { upload } = require("../helper/helperFunction.js");



const signup = async (req, res) => {
  try {
    let { password, date_of_birth, FullName, email, phone_number, gender, location } = req.body;
    date_of_birth = new Date(date_of_birth);
    date_of_birth = date_of_birth.toISOString();

    // Hashing the password
    const hashedPassword = bcrypt.hashSync(password, 8);
    const imageBuffer = req.files;
    const imageUrl = await upload(imageBuffer);

    const newDoctor = {
      FullName,
      email,
      password: hashedPassword,
      date_of_birth,
      phone_number,
      gender,
      imageUrl,
      location,
      role: 'doctor', // Assuming doctor signup
      verified: true,
      status: true
    };

    // Save doctor data to the database
    let result = await prisma.doctor.create({ data: newDoctor });

    res.status(201).send("Doctor Registered");
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const signin = async (req, res) => { 
  const { email, password } = req.body;

if (!email || !password) {
  return res.status(404).json({ error: "Email or Password not found." });
}

try {
  // Retrieve doctor from the database by email
  const doctor = await prisma.doctor.findUnique({
    where: {
      email: email
    }
  });

  // Check if doctor exists
  if (!doctor) {
    return res.status(404).json({ error: "User not found." });
  }

  // Checking if the password is valid
  const passwordMatch = await bcrypt.compare(password, doctor.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Password is incorrect." });
  }

  // Generate a JSON Web Token (JWT) for authentication
  const token = jwt.sign(
    {
      userId: doctor.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  let loggedUser = {
    id: doctor.id,
    FullName: doctor.FullName
  };

  res.status(200).json({ loggedUser, token, message: "Login succeeded" });
} catch (error) {
  console.error("Sign in error:", error);
  res.status(500).send("Internal server error");
}
};

const getOne = async (req, res) => {};

const sendReq = async (req, res) => {};

const search = async (req, res) => {};

const updatePatientMed = async (req, res) => {};


const getAllPatient = async (req, res) => {
  console.log("😎");
try {
  let result= await prisma.patient.findMany()
  console.log(result); 
  res.status(200).json(result)
} catch (err) {
    console.log(err);
    res.status(404).json({ error: " not found." })
  }
};

module.exports = {
  signup,
  getOne,
  signin,
  getAllPatient,
  updatePatientMed,
  search,
  sendReq,
};
