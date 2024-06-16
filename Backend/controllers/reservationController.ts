import { Router } from 'express';
import Joi from 'joi';
import db from '../config/db.config.js';
import { reservations } from '../models/reservation.js';
import { localizations } from '../models/localization.js';
import { isLoggedUser } from '../middleware/authMiddleware.js';
import { eq, between, and, or } from 'drizzle-orm';
const reservationsRouter = Router();
const calculatePrice = async (start_date, end_date) => {
    const PRICE_PER_HOUR = 10;
    var reservationTime = end_date.getTime() - start_date.getTime();
    var reservationHours = reservationTime / (1000 * 3600);
    var price = reservationHours * PRICE_PER_HOUR;
    return price;
};
const checkIfReservationTimeConflict = async (localization_id, start_date, end_date) => {
    let isConflict = true;
    var reservationList = await db.select().from(reservations).where(and(eq(reservations.localization_id, localization_id), (or(between(reservations.start_date, start_date, end_date), between(reservations.end_date, start_date, end_date)))));
    if (reservationList.length == 0) {
        isConflict = false;
    }
    return isConflict;
};
const insertReservation = async (reservation) => {
    const [res_time] = await db.select({
        start: localizations.res_start_date,
        end: localizations.res_end_date
    }).from(localizations).where(eq(localizations.id, reservation.localization_id));
    var start = res_time.start < reservation.start_date ? res_time.start : reservation.start_date;
    var end = res_time.end > reservation.end_date ? res_time.end : reservation.end_date;
    try {
        await db.transaction(async (tx) => {
            const { error: insertError } = await tx.insert(reservations).values(reservation);
            if (insertError) {
                tx.rollback();
                throw new Error(insertError.message);
            }
            const { error: updateError } = await tx.update(localizations).set({ res_start_date: start, res_end_date: end }).where(eq(localizations.id, reservation.localization_id));
            if (updateError) {
                tx.rollback();
                throw new Error(updateError.message);
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
reservationsRouter.post('/add', isLoggedUser, async (req, res) => {
    try {
        let { localization_id, start_date, end_date } = req.body;
        const schema = Joi.object({
            localization_id: Joi.number().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
        });
        const { error } = schema.validate({ localization_id, start_date, end_date });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else {
            start_date = new Date(start_date);
            end_date = new Date(end_date);
            const isConflict = await checkIfReservationTimeConflict(localization_id, start_date, end_date);
            if (isConflict) {
                return res.status(409).json({ error: 'Reservation time conflict' });
            }
            const price = await calculatePrice(start_date, end_date);
            const reservation = { localization_id, user_id: req.user.id, start_date, end_date, price };
            try {
                await insertReservation(reservation).then((result) => {
                    console.log(result);
                    res.status(201).json("Reservation created successfully");
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Insert operation unsuccessfull, rolling back changes: ' + error });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
reservationsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await db.select().from(reservations).where(eq(reservations.id, id));
        res.status(200).json(reservation);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
reservationsRouter.get('/past-reservations', isLoggedUser, async (req, res) => {
    try {
        const id = req.user.id;
        const reservationsList = await db.select().from(reservations).where(eq(reservations.user_id, id));
        res.status(200).json(reservationsList);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default reservationsRouter;
