import express from 'express';
import MoviesController from '../api/movies.controller.js';
import ReviewsController from '../api/reviews.controller.js';

const router = express.Router();
router.route('/').get(MoviesController.apiGetAllMovies);
router.route('/review')
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)

export default router;