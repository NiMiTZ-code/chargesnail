import express, { json, urlencoded } from 'express';
import session from 'express-session';
import userRouter from "./controllers/userController.js";

const app = express();
const port = 3000;
import db from './config/db.config.js';

app.use(json());
app.use(urlencoded({ extended: true }));
//app.use(cors());
app.use(session({
	secret: 'd361d614572161d6021d3989ede5252c2f470f7302e5fdc681a91d5e136c79f8',
	resave: true,
	saveUninitialized: true
}));


app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
