const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require("../db/prisma")

//const { User } = require("../model");
const signup = async (req, res) => {

 

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

const getAllPatient = async (req, res) => {};

module.exports = {
  signup,
  getOne,
  signin,
  getAllPatient,
  updatePatientMed,
  search,
  sendReq,
};
