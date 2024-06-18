import { Router } from 'express';
import Joi from 'joi';
import db from '../config/db.config.js';
import { reservations } from '../models/reservation.js';
import { isLoggedUser, isOwner } from '../middleware/authMiddleware.js';
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
    try {
        await db.transaction(async (tx) => {
            const { error: insertError } = await tx.insert(reservations).values(reservation);
            if (insertError) {
                tx.rollback();
                throw new Error(insertError.message);
            }
        });
    }
    catch (error) {
        return (error.message);
    }
};
const updateReservation = async (id, loc_id, reservation) => {
    let customErrorMsg;
    try {
        await db.transaction(async (tx) => {
            try {
                const { error: nullResTimeError } = await tx.update(reservations).set({ start_date: new Date(0), end_date: new Date(0) }).where(eq(reservations.id, id));
                if (nullResTimeError) {
                    throw new Error(nullResTimeError.message + " Could not zero previous reservation time");
                }
                const isConflict = await checkIfReservationTimeConflict(loc_id, reservation.start_date, reservation.end_date);
                if (isConflict) {
                    throw new Error("Reservation time conflict");
                }
                const { error: updateError } = await tx.update(reservations).set(reservation).where(eq(reservations.id, id));
                if (updateError) {
                    throw new Error(updateError.message + " Could not update reservation");
                }
            }
            catch (error) {
                console.log(error);
                customErrorMsg = error.message;
                tx.rollback();
                throw error;
            }
        });
    }
    catch (error) {
        return { success: false, message: error.message + ": " + customErrorMsg };
    }
    return { success: true };
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
reservationsRouter.get('/reservation', async (req, res) => {
    try {
        const id = req.body.id;
        const schema = Joi.object({
            id: Joi.number().required()
        });
        const { error } = schema.validate({ id });
        if (error) {
            res.status(400).json(error.details[0].message);
        }
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
reservationsRouter.patch('/update', isLoggedUser, isOwner, async (req, res, next) => {
    //eventually add a check for admin
    try {
        let { id, start_date, end_date } = req.body;
        const schema = Joi.object({
            id: Joi.number().required(),
            start_date: Joi.date(),
            end_date: Joi.date()
        });
        const { error } = schema.validate({ id, start_date, end_date });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else {
            start_date = new Date(start_date);
            end_date = new Date(end_date);
            let localization_id;
            try {
                localization_id = await db.select({ localization_id: reservations.localization_id }).from(reservations).where(eq(reservations.id, id));
            }
            catch (error) {
                return res.status(500).json({ error: 'Could not fetch localization' });
            }
            const price = await calculatePrice(start_date, end_date);
            const reservation = { start_date, end_date, price };
            updateReservation(id, localization_id[0].localization_id, reservation).then((result) => {
                console.log(result);
                if (result.success == false) {
                    res.status(409).json("Could not update reservation - " + result.message);
                }
                else {
                    res.status(200).json("Reservation updated successfully");
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default reservationsRouter;
