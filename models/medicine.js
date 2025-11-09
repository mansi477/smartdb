import mongoose from "mongoose";
const medSchema = new mongoose.Schema({
  name: String,
  batch: String,
  qty: Number,
  expiry: Date,
  metadata: Object
});
export default mongoose.model("Medicine", medSchema);
