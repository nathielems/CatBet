import { Request, Response } from "express";
import Service from "../services/Service"
import Bet from '../schemas/BetSchema';

const betService: Service = new Service(Bet);

class BetController {
  constructor(public service: Service) {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response) {
    return res.status(200).send(await this.service.getAll(req.query));
  }

  async get(req: Request, res: Response) {
    const response = await this.service.get(req.params);
    return res.status(response.statusCode).send(response);
  }

  async insert(req: Request, res: Response) {
    const data = req.body;

    const { data: bets }: any = await this.service.getAll({ cat: data.cat });

    console.log(bets)

    if (bets.length >= 2 && bets.every((a: any) => !a.fish.equals(data.fish)))
    {
      return res.status(409).send({
        error: true,
        statusCode:  409,
        item: null,
        message: "You can bet only in 2(two) fishes"
      });
    }

    let { data: record }: any = await this.service.get({
      cat: data.cat, 
      fish: data.fish
    });

    if (record) {
      record.amount += data.amount;

      const response = await this.service.update(record.id, record);
      return res.status(response.statusCode).send(response);
    }

    const response = await this.service.insert(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(204)/*.send(response)*/;
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

export default new BetController(betService);