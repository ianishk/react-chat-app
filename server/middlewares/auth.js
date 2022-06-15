// create a new middleware to check if the user is authenticated using jwt header

var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // get the jwt token from the header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.username = decoded.username;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

// export the auth middleware
module.exports = auth;



