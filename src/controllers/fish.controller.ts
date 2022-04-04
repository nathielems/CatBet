import { Request, Response } from "express";
import Service from "../services/Service"
import Fish from '../schemas/FishSchema';
import OpenWeatherService from "../services/OpenWeatherService";

const fishService: Service = new Service(Fish);
const openWeatherService: OpenWeatherService = new OpenWeatherService();

class FishController {
  constructor(public service: Service, public openWeatherService: OpenWeatherService) {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { lat, long } : any = req.query;

    const temperature: any = await this.openWeatherService.getTemperature(lat, long);

    if (temperature < 22) {
      const data = {
        error: false,
        statusCode: 200,
        data: [],
        total: 0
      }
      return res.status(200).send(data);
    }

    return res.status(200).send(await this.service.getAll(req.query));
  }

  async get(req: Request, res: Response) {
    const response = await this.service.get(req.params);
    return res.status(response.statusCode).send(response);
  }

  async insert(req: Request, res: Response) {
    const data = req.body;
    const response = await this.service.insert(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const response = await this.service.update(id, data);
    return res.status(response.statusCode).send(response);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.service.delete(id);
    return res.status(response.statusCode).send(response);
  }
}

export default new FishController(fishService, openWeatherService);