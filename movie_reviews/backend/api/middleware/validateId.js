import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;
const error_message = {error: "Server error"};

export const validateMovieId = (req, res, next) => {
    try {
        const id = (req.method === "GET") ? req.params.id : req.body.movie_id;
        error_message.error = "Movie not found";
        if (!ObjectId.isValid(id)) {
            return res.status(404).json(error_message);
        }
    } catch (err) {
        return res.status(500).json(error_message);
    }
    next();
};

export const validateReviewId = (req, res, next) => {
    const {review_id} = req.body;
    try {
        error_message.error = "Review not found";
        if (!ObjectId.isValid(review_id)) {
            return res.status(404).json(error_message);
        }
    } catch (err) {
        return res.status(500).json(error_message);
    }
    next();
};