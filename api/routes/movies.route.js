import express from "express";
import MoviesController from "../src/controllers/movies.controller.js";

const router = express.Router();
router.get('/movies/', MoviesController.getMovies);
export default router;