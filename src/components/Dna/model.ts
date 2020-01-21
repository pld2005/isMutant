import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface IDnaModel extends Document {
    dna: string;
    mutant: number;
    human: number;
}


const DnaSchema: Schema = new Schema({
    dna: String,
    mutant: Number,
    human: Number
}, {
    collection: 'Dnas',
    versionKey: false
});


export default connections.db.model < IDnaModel > ('DnaModel', DnaSchema);
