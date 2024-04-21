const prisma = require("../db/prisma");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    let { password, date_of_birth } = req.body;
    date_of_birth = new Date(date_of_birth);
    date_of_birth = date_of_birth.toISOString();
    const newPatient = { ...req.body, date_of_birth };

    newPatient.password = bcrypt.hashSync(password, 8);

    let result = await prisma.patient.create({ data: newPatient });

    res.status(201).send("Patient  Registred ");
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
const signin = async (req, res) => {};
const getOne = async (req, res) => {};
const sendReq = async (req, res) => {};
const search = async (req, res) => {};
const updateProfile = async (req, res) => {};
const getNear = async (req, res) => {};
module.exports = {
  signup,
  signin,
  getOne,
  sendReq,
  search,
  getNear,
  updateProfile,
};
