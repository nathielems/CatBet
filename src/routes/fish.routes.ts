import { Router } from "express";
import controller from "../controllers/fish.controller";

const routes = Router()

routes.get('/', controller.getAll)
routes.get('/:params', controller.get)
routes.post('/', controller.insert)
routes.put('/:id', controller.update)
routes.delete('/:id', controller.delete)

export default routes;