import DnaService from './service';
import { HttpError } from '../../config/error';
import { IDnaModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function mutant(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const isMutant: boolean = await DnaService.mutant(req.body);

        if (isMutant) { 
            res.sendStatus(200);
        }else {
            res.sendStatus(403);
        }    
    } catch (error) {
        next(new HttpError(500, error.message));
    }
}

export async function stats(req: Request, res: Response, next: NextFunction): Promise < void > {
    const stats: IDnaModel = await DnaService.stats();

    res.status(200).json(stats);
}


