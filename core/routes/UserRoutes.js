const controller = require("../controllers/UserController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", auth.verifyUserRole, controller.updateUser);
router.delete("/:id", auth.verifyUserRole, controller.deleteUser);

module.exports = router;
