import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";

import './database';

import fishRoutes from "./routes/fish.routes"
import betRoutes from "./routes/bet.routes"

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
    this.server.use("/fish", fishRoutes)
    this.server.use("/bet", betRoutes)
  }
}

module.exports = new App().server;