import mongoose from "mongoose";
import fishController from "../controllers/fish.controller";

describe('Testes', () => {
  beforeAll((done) => {
    const url =  "mongodb+srv://nathielems:teste@cluster0.8jfme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(url);

    let db = mongoose.connection;

    db.once('open', () => {
      done();
    });
  });

  test('teste', async () => {
    const req: any = {
      query: {
        lat: -22.9035,
        long: -43.2096
      }
    }

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await fishController.getAll(req, res);
    expect(res.status).toBeCalledWith(200);
  }, 30000)
});