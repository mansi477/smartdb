import express from "express";
import Alert from "../models/alert.js";
const router = express.Router();

router.get("/", async (req,res) => {
  const a = await Alert.find({ resolved: false }).sort({ createdAt: -1 }).lean().exec();
  res.json(a);
});

router.post("/:id/resolve", async (req,res) => {
  await Alert.findByIdAndUpdate(req.params.id, { resolved: true });
  res.json({ ok: true });
});

export default router;
