import jwt from 'jsonwebtoken';
import db from '../config/db.config.js';
import { eq } from 'drizzle-orm';
import { reservations } from '../models/reservation.js';
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
}

const isOwner = async (req, res, next) => {
    try{
        const user_uuid = req.user.id;
        const reservation_id = req.body.id;
        const ownerId = await db.select({user_uuid: reservations.user_id}).from(reservations).where(eq(reservations.id, reservation_id));
        if(ownerId !== user_uuid){
            return res.status(401).json({error: 'Unauthorized. User does not own this reservation'});
        }
        return next();
    }
    catch(error){
        res.status(401).json({error});
    }
}

export { isLoggedUser, isAdmin, isOwner };