const router = require("express").Router();

const auth = require("../controller/auth");

const validator = require("../middleware/validate");
const { userValidator } = require("../model/user");

router.post("/", validator(userValidator), auth.login);

module.exports = router;
