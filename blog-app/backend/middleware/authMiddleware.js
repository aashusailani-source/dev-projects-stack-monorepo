const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get Token from cookies or Authorization header
    const cookieToken = req.cookies.token;
    const headerToken = req.headers.authorization?.split(' ')[1];
    const header = req.headers;

    console.log("headers ", header);
    console.log("cookieToken ",cookieToken);
    console.log("headerToken ",headerToken);

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("token ", token);
    if(!token) {
        return res.status(401).json({
            success: false, 
            message: 'Unauthorized user, or token not found' 
        });
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // If token is valid, attach user to request object
        req.user = decoded;
        console.log("decoded" ,decoded, "req.user", req.user);

        // call next to pass the control to the next middleware/route handler
        next();

    } catch(error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token',
        })
    }
}

module.exports = authenticateToken;