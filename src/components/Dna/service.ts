import * as Joi from 'joi';
import DnaModel, { IDnaModel } from './model';
import DnaValidation from './validation';
import { IDnaService } from './interface';
import { Types } from 'mongoose';
import * as mutant from './module';




const DnaService: IDnaService = {
    
    async mutant(body: IDnaModel): Promise < boolean > {

        try {
            const validate: Joi.ValidationResult < IDnaModel > = DnaValidation.isDna(body);

            // console.log(validate);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return mutant.isMutant(body.dna);
        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default DnaService;
