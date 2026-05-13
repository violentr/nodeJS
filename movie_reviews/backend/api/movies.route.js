import express from 'express';
import MoviesController from '../api/movies.controller.js';
const router = express.Router();
router.route('/').get(MoviesController.apiGetAllMovies);
export default router;