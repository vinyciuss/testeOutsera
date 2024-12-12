import express from "express";
import ProducersController from "../src/controllers/producers.controller.js";

const router = express.Router();
router.get('/winning_producers/', ProducersController.getProducers);
export default router;