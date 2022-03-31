import express from 'express'
import { Request, Response } from 'express';

const app = express()
const { Router } = require("express");
const controller = require("../controllers/catBet.controller")
const routes = new Router()

routes.get('/', controller.get)

module.exports = routes