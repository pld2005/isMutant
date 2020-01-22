import { IDnaModel } from './model';

/**
 * @export
 * @interface IDnaService
 */
export interface IDnaService {
    mutant(IDnaModel: IDnaModel): Promise < boolean >;

    stats(): Promise<any>;

}
