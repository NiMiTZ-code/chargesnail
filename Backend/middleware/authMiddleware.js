import jwt from 'jsonwebtoken';
const isLoggedUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Unauthorized: no header' });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: malformed header' });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = verified;
        return next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};
const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 1) {
            return res.status(401).json({ error: 'Unauthorized role' });
        }
        return next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};
export { isLoggedUser, isAdmin };
