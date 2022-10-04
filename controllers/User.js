const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const secret_key = process.env.REACT_APP_SECRET_KEY;

const register = async (req, res) => {
  const {
    email,
    password,
    nama_lengkap,
    mobile,
    jenis_kelamin,
    alamat,
    no_ktp,
    no_npwp,
    bank,
    no_rekening,
    photo_profil,
    username,
  } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      nama_lengkap,
      email,
      password: hashedPassword,
      mobile,
      jenis_kelamin,
      alamat,
      no_ktp,
      no_npwp,
      bank,
      no_rekening,
      photo_profil,
      username,
    });

    const token = jwt.sign(
      { id: result._id, email: result.email },
      secret_key,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "Email tidak terdaftar" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password Salah" });

    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email },
      secret_key,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    nama_lengkap,
    mobile,
    jenis_kelamin,
    alamat,
    no_ktp,
    no_npwp,
    bank,
    no_rekening,
    photo_profil,
  } = req.body;

  try {
    const formUpdateUser = {
      nama_lengkap,
      mobile,
      jenis_kelamin,
      alamat,
      no_ktp,
      no_npwp,
      bank,
      no_rekening,
      photo_profil,
      _id: id,
    };
    await UserModel.findByIdAndUpdate(id, formUpdateUser, { new: true });
    res.json(formUpdateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "Account Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
};
