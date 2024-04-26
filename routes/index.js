const router = require("express").Router();

const Car = require("./carRouter");
const User = require("./userRouter");

router.use("/api/v1/cars", Car);
router.use("/api/v1/users", User);


module.exports = router;
