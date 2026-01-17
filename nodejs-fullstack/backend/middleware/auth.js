const jwt = require('jsonwebtoken');
const middleware = {}

middleware.verify = (req, res, next) => {
    const token = req.body?.token || req.query?.token || req.headers["x-access-token"];
    if (!token){
        return res.status(403).send("A token required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;
    }catch(error){
        return res.status(401).send("Invalid token");
    }
    return next();
}

module.exports = middleware;