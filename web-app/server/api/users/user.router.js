const router = require("express").Router();
const { createUser, login, getUsers, getUserByUserId, updateUsers, deleteUser } = require("./user.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/register", createUser);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);

module.exports = router;