import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  description: String,
});

export default mongoose.model("Genre", schema);
