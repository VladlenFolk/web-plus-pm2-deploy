import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import routes from './routes';

const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const { DB_ADDRESS = 'mongodb://localhost:27017/mestodb' } = process.env;

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

// Только для локальных тестов. Не используйте это в продакшене
app.use(cors({ origin: ['http://mestoproject.students.nomoreparties.sbs', 'https://mestoproject.students.nomoreparties.sbs'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
