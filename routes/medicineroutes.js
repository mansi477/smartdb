import express from "express";
import Medicine from "../models/medicine.js";
const router = express.Router();

router.get("/", async (req,res) => {
  const meds = await Medicine.find().lean().exec();
  res.json(meds);
});

// add med
router.post("/", async (req,res) => {
  const m = new Medicine(req.body);
  await m.save();
  res.json(m);
});

export default router;
