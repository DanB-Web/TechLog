import {NextFunction, Response, Request, RequestHandler} from 'express';

const authMiddleware : RequestHandler = async (_: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    next();
  } catch (err) {
    res.status(401);
    res.send('Unauthorized');
  }
  return;
}

export default authMiddleware;
