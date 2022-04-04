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

  test('get all fishes', async () => {
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
  })

  test('delete fish', async() => {

  })

  test('insert fish', async () => {
    let req: any = {
      body: {
        id: '133',
        name: 'pink 32'
      }
    }

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await fishController.insert(req, res);
    console.log(res)
    expect(res.status).toBeCalledWith(201);
    req = {
      params: {
        id: res.item._id
      }
    }
    await fishController.delete(req, res);
  })
}); 