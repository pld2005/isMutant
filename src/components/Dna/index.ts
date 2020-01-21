import DnaService from './service';
import { HttpError } from '../../config/error';
import { IDnaModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function mutant(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const isMutant: boolean = await DnaService.mutant(req.body);

        if (isMutant) { 
            res.status(200).json({ result: 'Ok' });
        }else {
            res.status(400);
        }    
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


// export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//         const dnas: IDnaModel[] = await DnaService.findAll();

//         res.status(200).json(dnas);
//     } catch (error) {
//         next(new HttpError(error.message.status, error.message));
//     }
// }

// export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//         const dna: IDnaModel = await DnaService.findOne(req.params.id);

//         res.status(200).json(dna);
//     } catch (error) {
//         next(new HttpError(error.message.status, error.message));
//     }
// }

// export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//         const dna: IDnaModel = await DnaService.insert(req.body);

//         res.status(201).json(dna);
//     } catch (error) {
//         next(new HttpError(error.message.status, error.message));
//     }
// }


