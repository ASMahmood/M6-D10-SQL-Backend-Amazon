const express = require("express");
const Product = require("../util/database").Product;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
