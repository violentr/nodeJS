import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
let reviews;
class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) return;
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (error) {
            console.error(error);
        }
    }
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId)
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e.message };
        }
    }
    static async updateReview(reviewId, userId, review, date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: new ObjectId(reviewId)},
                {$set: {review, date: date}}
            );
            return updateResponse;
        }catch(e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message };
        }
    }
}

export default ReviewsDAO;