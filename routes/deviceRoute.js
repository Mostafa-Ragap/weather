const {
  createDevice,
  getAllDevice,
  getDeviceById,
} = require("../controller/deviceController");
const router = require("express").Router();
const { validateRequest } = require("../middleware/validateRequest");
const { createDeviceValidator } = require("../utils/validate/deviceValidator");
const { auth, allowedTo } = require("../controller/auth");

router
  .route("/")
  .post(
    auth,
    allowedTo("admin"),
    validateRequest(createDeviceValidator),
    createDevice
  )

  .get(auth, allowedTo("admin"), getAllDevice);

router.route("/:deviceId").get(auth, allowedTo("admin"), getDeviceById);

module.exports = router;
