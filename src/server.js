const express = require("express");
const cors = require("cors");
const database = require("./util/database");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./util/errorHandling");

const productRouter = require("./services/product");

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/product", productRouter);

database.sequelize.sync({ force: false }).then((result) => {
  server.listen(port, () => {
    console.log("Server is protecting their chips from ", port, " seagulls");
  });
});
