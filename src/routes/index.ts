import { Router } from "express";

const router = Router();

router.get("/health/live", (req, res) => res.json({ status: "UP" }));
router.get("/health/ready", (req, res) => res.json({ status: "READY" }));

export default router;
