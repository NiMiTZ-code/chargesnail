import {Router} from 'express';
import Joi from 'joi';
import db from '../config/db.config.js';
import {reservations} from '../models/reservation.js';
import { isLoggedUser } from '../middleware/authMiddleware';

const reservationsRouter = Router();

type Reservation = {
    localization_id: number,
    user_id: string,
    start_date: Date,
    end_date: Date,
    price: number
};

const calculatePrice = async (start_date: Date, end_date: Date) => {
    const PRICE_PER_HOUR = 10;
    var reservationTime = end_date.getTime() - start_date.getTime();
    var reservationHours = reservationTime / (1000 * 3600);
    var price = reservationHours * PRICE_PER_HOUR;
    return price;
}

const insertReservation = async (reservation: Reservation) => {
    return db.insert(reservations).values(reservation);
};

reservationsRouter.post('/add', isLoggedUser, async (req, res) => {
    try {
        let { localization_id, start_date, end_date } = req.body;
        const schema = Joi.object({
            localization_id: Joi.number().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
        });
        const { error } = schema.validate({ localization_id, start_date, end_date});
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else { //should check if the reservation already exists TODO
            const price: number = await calculatePrice(start_date, end_date);
            const reservation = { localization_id, user_id: req.user.id, start_date, end_date, price };
            insertReservation(reservation).then((result) => {
                console.log(result);
                res.status(201).json("Reservation created successfully");
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default reservationsRouter;