import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
    static async apiGetAllMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        let filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }
        const {moviesList, totalNumMovies} = await MoviesDAO.getAllMovies({filters, page, moviesPerPage})
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        return res.json(response);
    }
    static async apiGetMovieById(req, res, next) {
        try{
            const movieId = req.params.id || {};
            let id = await MoviesDAO.getMovieById(movieId);
            if (id == null) {
                return res.status(404).json({error: "Movie not found"});
            }
            return res.json(id);
        }catch(err){
            return res.status(500).json({error: "Movie id is required"});
        }
    }
    static async apiGetRating(req, res, next){

        try{
            let propertyTypes = await MoviesDAO.getRatings();
            return res.json(propertyTypes);
        }catch(err){
            console.log(`api ${err.message}`);
            return res.status(500).json({error: "Server error"});
        }
    }
}