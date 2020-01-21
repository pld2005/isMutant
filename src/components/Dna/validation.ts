import * as Joi from 'joi';
import Validation from '../validation';
import { IDnaModel } from './model';

class DnaValidation extends Validation {

    constructor() {
        super();
    }

    isDna(
        params: IDnaModel
    ): Joi.ValidationResult < IDnaModel > {
        const schema: Joi.Schema = Joi.object().keys({
            dna: Joi.array().min(4).items(Joi.string().min(4).required()).required(),
        });

        return Joi.validate(params, schema);
    }
    // isDna(
    //     body: {
    //         dna: string
    //     }
    // ): Joi.ValidationResult < {
    //     dna: string
    // } > {
    //     const schema: Joi.Schema = Joi.object().keys({
    //         dna: this.customJoi.objectId().required()
    //     });

    //     return Joi.validate(body, schema);
    // }

}

export default new DnaValidation();
