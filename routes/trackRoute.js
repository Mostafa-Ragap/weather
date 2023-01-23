const { createTrack, getAlltracks } = require("../controller/trackController");
const router = require("express").Router();

router.route("/").post(createTrack).get(getAlltracks)



module.exports = router;
