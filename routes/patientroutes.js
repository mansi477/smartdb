import express from "express";
import Patient from "../models/patient.js";
import Alert from "../models/alert.js";

const router = express.Router();

// list patients
router.get("/", async (req, res) => {
  const p = await Patient.find().lean().exec();
  res.json(p);
});

// create patient
router.post("/", async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json(patient);
});

// update vitals (wristband posts here)
router.post("/:id/vitals", async (req, res) => {
  const p = await Patient.findById(req.params.id);
  if (!p) return res.status(404).json({ error: "not found" });
  p.vitals = req.body;
  await p.save();
  // check simple anomaly rules
  const hr = req.body.hr, spo2 = req.body.spo2;
  if ((hr && (hr < 40 || hr > 180)) || (spo2 && spo2 < 90)) {
    const alert = new Alert({ type: "vitals", severity: "high", related: p._id.toString(), message: `Critical vitals HR:${hr} SpO2:${spo2}` });
    await alert.save();
  }
  res.json({ ok: true });
});

// latest telemetry
router.get("/:id/latest", async (req, res) => {
  const p = await Patient.findById(req.params.id).lean().exec();
  if (!p) return res.status(404).json({});
  res.json(p.vitals || {});
});

export default router;
