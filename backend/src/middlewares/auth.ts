import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  _id: string
}

dotenv.config({ path: '../../.env' });
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.error('Отсутствует значение для JWT_SECRET в переменных окружения');
  process.exit(1); // Выход из приложения с ошибкой
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt || req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('Токен не передан');
    }
    token = token.replace('Bearer ', '');
    let payload: JwtPayload | null = null;

    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
