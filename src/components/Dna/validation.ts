import Validation from '../validation';

class DnaValidation extends Validation {

    constructor() {
        super();
    }

    isDna(body: any): any {
        try {
            const minLength: number = 4;
        
            let incorrectSequence : boolean = false;
            let rowMinLength : boolean = false;

            if (!body.dna) { 
                throw new Error('Debe enviar el ADN');
            }

            const dna : any = body.dna;

            if (!Array.isArray(dna)) {
                throw new Error('No es una array');
            }

            if (dna.length < minLength) { 
                throw new Error('La matriz debe contener al menos 4 filas');
            }


            const isQuadratic : boolean[] = dna.map((sequence: string) => {
                if (sequence.length < minLength) rowMinLength = true;
                if ((/[^A,T,C,G]/i).test(sequence)) {
                    incorrectSequence = true;  
                    console.log('Los valores de permitidos son A, G, T y C');
                }
                if (sequence.length !== dna.length) {
                    return false;
                } 
                }).filter((value: boolean) => value !== undefined);
            
            if (isQuadratic.length > 0) {
                throw new Error('La matriz de ADN debe ser cuadrada (N x N)');
            }
            
            if (incorrectSequence) { 
                throw new Error('Solo se permiten los valores A, T, G y C');
            }

            if (rowMinLength) {
                throw new Error('La matriz debe contener al menos 4 columnas en todas sus filas');
            }

            return null;
        } catch (error) {
            return { error };
        }
    }
}

export default new DnaValidation();
