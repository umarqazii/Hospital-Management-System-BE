import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'my-secret-key';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.body.userId = (decoded as any).id;
    next();
  });
};