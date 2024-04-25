const router = require("express").Router();
const { Car } = require("../models");

const carController = require("../controllers/carController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");
const checkId = require("../middlewares/checkId");

router.post(
  "/",
  autentikasi,
  checkRole(["Admin", "Manager"]),
  upload.array("images"),
  carController.createCar
);
router.get("/", autentikasi, carController.findCars);
router.get(
  "/:id",
  autentikasi,
  checkId(Car),
  carController.findCarById
);
router.patch(
  "/:id",
  autentikasi,
  checkId(Car),
  checkRole(["Admin", "Manager"]),
  checkOwnership,
  upload.array("images"),
  carController.UpdateCar
);
router.delete(
  "/:id",
  autentikasi,
  checkId(Car),
  checkRole(["Admin", "Manager"]),
  checkOwnership,
  carController.deleteCar
);

module.exports = router;
