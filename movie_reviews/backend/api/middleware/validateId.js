import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

export const validateMovieId = (req, res, next) => {
    try {
        const {id} = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Movie not found'});
        }
    } catch (err) {
        return res.status(500).json({err: "Server error"});
    }
    next();
};