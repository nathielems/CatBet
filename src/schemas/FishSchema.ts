import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("fish", schema);