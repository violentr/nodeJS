import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({ error })
                return
            }
            res.status(201).json({status: "success"});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const userId = req.body.user_id;
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                date
            )
            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({ error })
                return
            }
            if (ReviewResponse.modifiedCount === 0){
                throw new Error("Review not found");
            }
            res.json({status: "success"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}