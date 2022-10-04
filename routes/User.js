const express = require("express");
const router = express.Router();

const {
  getUsers,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/User");

router.post("/register", register);
router.post("/login", login);

router.get("/all", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
