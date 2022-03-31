const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")

const routes = require('./routes/catBet.routes');

class App {
  server: any;
  constructor () {
    this.server = express();

    this.server.use(bodyParser.urlencoded({ extended: true }))
    this.server.use(bodyParser.json())
    this.server.use(cors())

    this.routes();
  }

  routes() {
    this.server.use("/", routes)
  }
}

module.exports = new App().server;