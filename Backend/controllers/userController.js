import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
const userRouter = Router();
import db from '../config/db.config.js';
import { users } from '../models/user.js';
import { eq } from 'drizzle-orm';
const JWT_SECRET = process.env.JWT_SECRET;
const insertUser = async (user) => {
    return db.insert(users).values(user);
};
userRouter.post('/auth/register', async (req, res) => {
    try {
        let { name, surname, email, password } = req.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string()
                .min(6)
                .max(50)
                .email().
                required(),
            password: Joi.string()
                .min(8)
                .max(20)
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
                .messages({
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must be at most 20 characters long",
                "any.required": "Password is required"
            }),
        });
        const { error } = schema.validate({ name, surname, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        else {
            const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
            if (user.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            else {
                password = bcrypt.hashSync(password, 10);
                const user = { name, surname, email, password };
                await insertUser(user);
                res.json(user);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
userRouter.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const schema = Joi.object({
            email: Joi.string()
                .min(6)
                .max(50)
                .email().
                required(),
            password: Joi.string()
                .min(8)
                .max(20)
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
                .messages({
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must be at most 20 characters long",
                "any.required": "Password is required"
            }),
        });
        const { error } = schema.validate({ email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (user.length > 0) {
            const isMatch = bcrypt.compareSync(password, user[0].password);
            if (isMatch) {
                const token = await jwt.sign({ id: user[0].uuid }, JWT_SECRET, { expiresIn: 3600 });
                res.json({ user, token });
            }
            else {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        }
        else {
            return res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
export default userRouter;
