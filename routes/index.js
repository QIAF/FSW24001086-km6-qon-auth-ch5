const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger.json');

const Car = require("./carRouter");
const User = require("./userRouter");

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use("/api/v1/cars", Car);
router.use("/api/v1/users", User);


module.exports = router;
