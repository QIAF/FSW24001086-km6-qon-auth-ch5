const { Car } = require("../models");
const imagekit = require("../lib/imagekit");

const createPage = async (req, res) => {
  res.render("create.ejs");
};

const createCar = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;

  console.log(req.body);

  try {
    // dapatkan extension file nya
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];

    // upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    // IMG-10062023.jpeg

    await Car.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });

    res.redirect("/dashboard/admin");
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const findCars = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.render("index.ejs", {
      cars,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  createPage,
  createCar,
  findCars,
};
