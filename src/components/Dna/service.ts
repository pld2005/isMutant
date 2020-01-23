import * as Joi from 'joi';
import DnaModel, { IDnaModel } from './model';
import DnaValidation from './validation';
import { IDnaService } from './interface';
// import { Types } from 'mongoose';
import * as mutant from './module';
// import { stats } from '.';
// import { stat } from 'fs';




const DnaService: IDnaService = {
    
    async mutant(body: IDnaModel): Promise < boolean > {

        try {
            
            const validate: Joi.ValidationResult < IDnaModel > = DnaValidation.isDna(body);
            
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            const dna: any = body.dna;
            let incorrectSequence : boolean = false;

            const isQuadratic : boolean[] = dna.map((sequence: string) => {
                if ((/[^A,T,C,G]/i).test(sequence)) {
                    incorrectSequence = true;        
                    console.log('Base nitrogenada incorrecta');
                }
                if (sequence.length !== dna.length) {
                    return false;
                } 
                }).filter((value: boolean) => value !== undefined);
            
            if (isQuadratic.length > 0) {
                throw new Error('La matriz de ADN debe ser cuadrada (N x N)');
            }
               
            if (incorrectSequence) { 
                throw new Error('Base nitrogenada incorrecta. Solo se permiten los valores A, T, G y C');
            }

            const isMutant : boolean = mutant.isMutant(body.dna);
            
            
            const dnaObj: any = {
                dna: body.dna.toString(),
                mutant:  isMutant ? 1 : 0,
                human:  isMutant ? 0 : 1,   
            };
            
            const filter : any = { dna: body.dna.toString() };

            await DnaModel.findOneAndUpdate(filter, dnaObj, {
                new: true,
                upsert: true // Make this update into an upsert
            });
            
            return isMutant;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async stats() : Promise < any > {
        try {
            const query: any = 
                [
                    { 
                        $group : {
                            _id : null, 
                            count_mutant_dna : {
                                $sum : '$mutant'
                            }, 
                            count_human_dna : {
                                $sum : '$human'
                            }
                        }
                    }, 
                    { 
                        $project : {
                            _id: 0,
                            count_mutant_dna : 1.0, 
                            count_human_dna : 1.0, 
                            ratio : {
                                $cond : [
                                    {
                                        $eq : [
                                            '$count_human_dna', 
                                            0.0
                                        ]
                                    }, 
                                    '100', 
                                    {
                                        $multiply : [
                                            {
                                                $divide : [
                                                    '$count_mutant_dna', 
                                                    '$count_human_dna'
                                                ]
                                            }, 
                                            100.0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ];
            
            let stats: any = await DnaModel.aggregate(query);
            
            if (stats.length === 0) {
                stats = [{
                    count_mutant_dna: 0,
                    count_human_dna: 0,
                    ratio: 0
                }];
            }
            
            return stats[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default DnaService;
