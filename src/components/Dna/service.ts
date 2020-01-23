import DnaModel, { IDnaModel } from './model';
import { IDnaService } from './interface';
import * as mutant from './module';

const DnaService: IDnaService = {
    
    async mutant(body: IDnaModel): Promise < boolean > {

        try {
            
            
            const isMutant : boolean = mutant.isMutant(body);
            
            
            const dnaObj: any = {
                dna: body.dna.toString(),
                mutant:  isMutant ? 1 : 0,
                human:  isMutant ? 0 : 1,   
            };
            
            const filter : any = { dna: body.dna.toString() };

            await DnaModel.findOneAndUpdate(filter, dnaObj, {
                new: true,
                upsert: true 
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
