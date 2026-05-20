let movies;
/* this is a Movies data access object */
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

class MoviesDAO {
    static async injectDB(conn) {

        if (movies) return;
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        } catch (error) {
            console.error(error);
        }
    }

    static async getMovieById(movieId){
        if (!movieId) return null;
        try{
            return await movies.aggregate([
                {$match: {_id: new ObjectId(movieId)}},
                {$lookup: {from: 'reviews', localField: '_id', foreignField: 'movie_id', as: 'reviews'}}

            ]).next()
        }catch(e){
            console.error(`Unable to fetch movie: ${e}`);
            throw e;
        }

    }

    static async getAllMovies({filters = null, page = 0, moviesPerPage = 20} = {}) {
        let query;
        if (filters) {
            if ("title" in filters) {
                query = {$text: {$search: filters.title}}
            } else if ("rated" in filters) {
                query = {"rated": {$eq: filters.rated}}
            }
        }
        let cursor;
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return {moviesList, totalNumMovies};
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return {moviesList: [], totalNumMovies: 0};
        }
    }
}

export default MoviesDAO;
