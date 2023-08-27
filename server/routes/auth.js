const router = require("express").Router();

const auth = require("../controller/auth");

const validator = require("../middleware/validate");
const { userLoginValidator } = require("../model/user");

router.post("/", validator(userLoginValidator), auth.login);

module.exports = router;
