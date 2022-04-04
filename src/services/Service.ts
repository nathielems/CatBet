import mongoose from "mongoose";

class Service {
  constructor(public model: any = null) {
    this.count = this.count.bind(this);
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async count(query: any) {
    for (const item of Object.keys(query)) {
      try {
        query[item] = new mongoose.mongo.ObjectId(query[item]);
      } catch (error) {
        query[item] = new RegExp(query[item], "i");
      }
    }

    try {
      const count = await this.model.where(query).count()

      return {
        error: false,
        statusCode: 200,
        data: count
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async getAll(query: any): Promise<{
    error: Boolean,
    statusCode: number,
    errors?: Array<any>,
    data?: Object,
    total?: number
  }> {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    for (const item of Object.keys(query)) {
      query[item] = new RegExp(query[item], "i");
    }

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
      }
    }

    try {
      const items: any[] = await this.model
        .find(query)
        .skip(skip)
        .limit(limit);

      const total = await this.model.count();

      return {
        error: false,
        statusCode: 200,
        data: items,
        total
      };
    } catch (errors: any) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async get(query: any): Promise<{
    error: Boolean,
    statusCode: number,
    errors?: Array<any>,
    data?: Object,
    message?: String
  }> {
    for (const item of Object.keys(query)) {
      try {
        query[item] = new mongoose.mongo.ObjectId(query[item]);
      } catch (error) {
        query[item] = new RegExp(query[item], "i");
      }
    }

    try {
      const data: any = await this.model.findOne(query);

      if (!data)
        return {
          error: true,
          statusCode: 404,
          message: "Registro não encontrado"
        };

      return {
        error: false,
        statusCode: 200,
        data
      };
    } catch (errors: any) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async insert(data: any): Promise<{
    error: Boolean,
    statusCode: number,
    errors?: Array<any>,
    item?: any
  }> {
    try {
      const item: any = await this.model.create(data);

      return {
        error: false,
        statusCode: 200,
        item
      }

    } catch (errors: any) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async update(id: any, data: any): Promise<{
    error: Boolean,
    statusCode: number,
    errors?: Array<any>,
    item?: any,
    message?: String,
  }> {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });

      return {
        error: false,
        statusCode: 202,
        item
      };
    } catch (errors: any) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async delete(id: any): Promise<{
    error: Boolean,
    statusCode: number,
    errors?: Array<any>,
    item?: any,
    message?: String,
    deleted?: Boolean,
  }> {
    try {
      const item = await this.model.findByIdAndDelete(id);

      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: "item not found"
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item
      };
    } catch (errors: any) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }
}

export default Service