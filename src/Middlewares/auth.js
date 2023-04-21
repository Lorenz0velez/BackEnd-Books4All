const { verifyToken } = require("../controllers/generateToken");

const checkAuth = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
        const token = authHeader.split(' ')[1];
        const tokenDecoded = await verifyToken(token)
        console.log(tokenDecoded);
        if (tokenDecoded.name) {
            next()
        } else {
            res.status(404).send('Invalid token');
        }
    } catch (error) {
        console.log(error);
        res.status(404).send('Access denied');
    }
}

module.exports = { checkAuth }