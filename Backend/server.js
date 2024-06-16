import express, { json, urlencoded } from 'express';
import session from 'express-session';
import userRouter from "./controllers/userController.js";
import localizationsRouter from "./controllers/localizationController.js";
import reservationsRouter from "./controllers/reservationController.js";
import cors from 'cors';

const app = express();
const port = 3000;
import db from './config/db.config.js';

app.use(json());
app.use(urlencoded({ extended: true }));
const corsOrigin ={
    origin:'http://localhost:5173',
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(session({
	secret: 'd361d614572161d6021d3989ede5252c2f470f7302e5fdc681a91d5e136c79f8',
	resave: true,
	saveUninitialized: true
}));

app.use('/api/users', userRouter);
app.use('/api/localizations', localizationsRouter);
app.use('/api/reserve', reservationsRouter);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
