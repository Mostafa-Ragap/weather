const {
  createUser,
  login,
  getAllUsers,
  getUserById,
} = require("../controller/userController");
const router = require("express").Router();
const { validateRequest } = require("../middleware/validateRequest");
const {
  createUserValidator,
  loginUserValidator,
} = require("../utils/validate/userValidator");
const { auth, allowedTo } = require("../controller/auth");

router
  .route("/")
  .post(validateRequest(createUserValidator), createUser("user"))
  .get(getAllUsers);
router.route("/login").post(validateRequest(loginUserValidator), login);
router.route("/:id").get(auth, allowedTo("admin"), getUserById);
router.route("/addUsers").post(auth, allowedTo("admin"), createUser);

module.exports = router;
