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
}

export default new DnaValidation();
