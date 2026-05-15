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
    static async addReview(movieId,user, review, date){
      try{
          console.log(user);
          const reviewDoc = {name: user.name, review, user_id: user._id, movie_id: new ObjectId(movieId)};
          return await reviews.insertOne(reviewDoc);
      }catch(e){
          console.error(`Unable to post review: ${e}`);
          return { error: e.message };
      }
    }
}

export default ReviewsDAO;