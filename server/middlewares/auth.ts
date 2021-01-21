import {NextFunction, Response, RequestHandler} from 'express';

const authMiddleware : RequestHandler = async (_: any, res: Response, next: NextFunction) : Promise<void> => {
  try {
    next();
  } catch (err) {
    res.status(401);
    res.send('Unauthorized');
  }
  return;
}

module.exports = authMiddleware;
