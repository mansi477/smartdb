import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isNewborn: { type: Boolean, default: false },
  wristbandId: { type: String, default: null },
  vitals: {
    hr: Number,
    spo2: Number,
    bpSys: Number,
    bpDia: Number,
    tempC: Number,
    battery: Number
  },
  guardianContact: String,
  feedingSchedule: Array,
  weightLogs: Array
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
