import mongoose from "mongoose";

const schema = new mongoose.schema({
  id: { type: Number, required: true },
  name: { type: String, minlength: 1 },
  genre: [String],
  type: [String],
});

export default mongoose.model("Anime", schema);
