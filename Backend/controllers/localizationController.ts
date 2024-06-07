import { Router } from 'express';
import Joi from 'joi'
import db from '../config/db.config.js';
import { localizations } from '../models/localization.js';
import { eq, ilike } from 'drizzle-orm';
import { isLoggedUser, isAdmin } from '../middleware/authMiddleware.js';

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
    return db.delete(localizations).where(eq(localizations.id, id));
}

localizationsRouter.post('/add', isLoggedUser, isAdmin, async (req, res) => {
    try {
        let { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date } = req.body;
        const schema = Joi.object({
            display_name: Joi.string().required().min(5).max(30),
            street: Joi.string().required(),
            city: Joi.string().required(),
            postal_code: Joi.string().required(),
            gps_lat: Joi.string().required().regex(/^((\-?|\+?)?\d+(\.\d+)?)$/),
            gps_long: Joi.string().required().regex(/\s*((\-?|\+?)?\d+(\.\d+)?)$/),
            isActive: Joi.boolean().required(),
            description: Joi.string(),
            res_start_date: Joi.date(),
            res_end_date: Joi.date()
        });
        const { error } = schema.validate({ display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date });
        if (error) {
            return res.status(400).json(error.details[0].message)
        } else { //should check if the localization already exists TODO
            const localization = { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date };
            insertLocalization(localization).then((result) => {
                console.log(result);
                res.status(201).json("Localization created successfully");
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

localizationsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        getLocalizationById(id).then((result) => {
            res.status(200).json(result);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

localizationsRouter.get('/', async (req, res) => {
    try {
        getAllLocalizations().then((result) => {
            res.status(200).json(result);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error: '+err });
    }
});
localizationsRouter.delete('/delete/:id', isLoggedUser, isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        deleteLocalization(id).then((result) => {
            res.status(200).json({ message: 'Localization deleted' });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error: '+ err });
    }
});

localizationsRouter.patch('/update/:id', isLoggedUser, isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        let { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date } = req.body;
        const schema = Joi.object({
            display_name: Joi.string().min(5).max(30),
            street: Joi.string(),
            city: Joi.string(),
            postal_code: Joi.string(),
            gps_lat: Joi.string().regex(/^((\-?|\+?)?\d+(\.\d+)?)$/),
            gps_long: Joi.string().regex(/\s*((\-?|\+?)?\d+(\.\d+)?)$/),
            isActive: Joi.boolean(),
            description: Joi.string(),
            res_start_date: Joi.date(),
            res_end_date: Joi.date()
        });
        const { error } = schema.validate({ display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date });
        if (error) {
            return res.status(400).json(error.details[0].message)
        } else {
            if(!id) return res.status(400).json('Id is required');
            const localization: Partial<{ display_name?: string, street?: string, city?: string, postal_code?: string, gps_lat?: string, gps_long?: string, isActive?: boolean, description?: string, res_start_date?: Date, res_end_date?: Date }> = { display_name, street, city, postal_code, gps_lat, gps_long, isActive, description, res_start_date, res_end_date };
            updateLocalization(id, localization).then((result) => {
                res.status(200).json({ message: 'Localization updated' });
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error: '+err });
    }
});


export default localizationsRouter;
