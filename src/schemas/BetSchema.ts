import mongoose, { Schema } from "mongoose";
import './FishSchema';

const schema = new Schema(
  {
    cat: {
      type: String,
      required: true
    },
    fish: {
      type: Schema.Types.ObjectId,
      ref: "fish",
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("bet", schema);