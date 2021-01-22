const express = require("express");
const Product = require("../util/database").Product;
const Category = require("../util/database").Category;
const Review = require("../util/database").Review;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allProduct = await Product.findAll({ include: [Category, Review] });
    res.status(200).send(allProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [Category, Review],
    });
    res.status(200).send(singleProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const alteredProduct = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.send("Product Deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
