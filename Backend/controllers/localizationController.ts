import { Router } from 'express';
import Joi from 'joi'
import db from '../config/db.config.js';
import { localizations } from '../models/localization.js';
import { eq, ilike } from 'drizzle-orm';

const localizationsRouter = Router();

const insertLocalization = async (localization) => {
    return db.insert(localizations).values(localization);
}

const getAllLocalizations = async () => {
    return db.select().from(localizations);
}

const getLocalizationById = async (id) => {
    return db.select().from(localizations).where(eq(localizations.id, id));
}

const getAllLocalizationByCity = async (city) => {
    return db.select().from(localizations).where(ilike(localizations.city, `${city}%`));
}

const updateLocalization = async (id, localization) => {
    return db.update(localizations).set(localization).where(eq(localizations.id, id));
}

const deleteLocalization = async (id) => {
    return db.delete().from(localizations).where(eq(localizations.id, id));
}

localizationsRouter.post('/', async (req, res) => {
    try {
        let { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date } = req.body;
        const schema = Joi.object({
            display_name: Joi.string().required().min(5).max(30),
            street: Joi.string().required(),
            city: Joi.string().required(),
            postal_code: Joi.string().required(),
            gps_lat: Joi.string().required().regex(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/),
            gps_long: Joi.string().required().regex(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/),
            isActive: Joi.boolean().required(),
            description: Joi.string(),
            res_start_date: Joi.date(),
            res_end_date: Joi.date()
        });
        const { error } = schema.validate({ display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date });
        if (error) {
            return res.status(400).json(error.details[0].message)
        } else { //should check if the user is admin and if the localization already exists TODO
            const localization = { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date };
            insertLocalization(localization).then((result) => {
                res.status(201).json(result);
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
