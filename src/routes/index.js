const router = require("express").Router();

const Car = require("./carRouter");
const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const authenticate = require("../middlewares/authenticate");

router.use("/api/v1/cars", Car);
router.use("/api/v1/auth", Auth);

router.use("/", Admin);

module.exports = router;
