import { HttpError } from './index';
import { NextFunction, Request } from 'express';

/**
 * @exports
 * @param {Request} req
 * @param {*} res
 * @param {NextFunction} next
 * 
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *        - status
 *        - message
 *      properties:
 *        status:
 *          type: integer
 *          description: HTTP status code
 *          example: 200
 *        message:
 *          type: string
 *          description: Error description
 *          example: User created
 */
export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
    res.sendHttpError = (error: HttpError): void => {
        res.status(error.status).send(error);
    };

    next();
}

