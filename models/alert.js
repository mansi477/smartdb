import mongoose from "mongoose";
const alertSchema = new mongoose.Schema({
  type: String,
  severity: String,
  related: String,
  message: String,
  resolved: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Alert", alertSchema);
