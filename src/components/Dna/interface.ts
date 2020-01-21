import { IDnaModel } from './model';

/**
 * @export
 * @interface IDnaService
 */
export interface IDnaService {
    mutant(IDnaModel: IDnaModel): Promise < boolean >;

    // findAll(): Promise<IDnaModel[]>;

    // findOne(dna: string): Promise<IDnaModel>;

    // insert(IDnaModel: IDnaModel): Promise<IDnaModel>;

    // remove(id: string): Promise<IDnaModel>;
}
