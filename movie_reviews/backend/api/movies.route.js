import express from 'express';
import MoviesController from '../api/movies.controller.js';
import ReviewsController from '../api/reviews.controller.js';
// Middleware
import { validateMovieId } from './middleware/validateId.js';

const router = express.Router();
router.route('/').get(MoviesController.apiGetAllMovies);
router.route('/id/:id').get(validateMovieId, MoviesController.apiGetMovieById);

router.route('/review')
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router;