import express from "express";
import MoviesController from "../src/controllers/movies.controller.js";

const router = express.Router();
router.get('/worse_movies/', MoviesController.getMovies);
export default router;