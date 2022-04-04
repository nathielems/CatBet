import mongoose from "mongoose";

class Connection {
  constructor() {
    const url =  "mongodb+srv://nathielems:teste@cluster0.8jfme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(url);
  }
}

export default new Connection();