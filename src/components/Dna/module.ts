// secuencias ADN a buscar
const dnaSequence : string[] = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];
// cantidad minima para considerarlo mutante
const minSequence : number = 2;
// cantidad de secuencias encontradas
let mutantSequenceFound : number = 0;

export function isMutant(dna: string[]): boolean {
    mutantSequenceFound = 0;
    horizontalSearch(dna); // buscar secuencias en filas
    verticalSearch(dna); // buscar secuencias en columnas
    diagonalSearch(dna); // buscar secuencias en diagonal / 
    diagonalSearch(dna.reverse()); // buscar secuencias en diagonal secundaria (se invierte matriz para reutilizar metodo anterior) \ 
    console.log(mutantSequenceFound);

    return mutantSequenceFound >= minSequence;
}

function horizontalSearch(dna: string[]): void {
    dna.map((chain: string) => secuenceSearch(chain));
}

function verticalSearch(dna: string[]) : void {
    for (let i : number = 0; i < dna.length; i++) {
        let word: string = '';

        dna.map((chain : string) => {
            word = word.concat(chain.charAt(i));
        });
        secuenceSearch(word);
    }
}

function diagonalSearch(dna: string[]) : void {
    let word: string = '';
    let s: number;
    let x: number;
    let y : number;
     
    for (s = 0; s < dna.length; s++) { // por cada fila
        word = '';
        for (y = s, x = 0; y >= 0; y--, x++) {
            word = word.concat(dna[y][x]);
        }
        if (word.length >= dnaSequence[0].length) secuenceSearch(word);
    }
    
    for (s = 1; s < dna[0].length; s++) {
        word = '';
        for (y = dna.length - 1, x = s; x < dna[0].length; y--, x++) {
            word = word.concat(dna[y][x]);
        }
        if (word.length >= dnaSequence[0].length) secuenceSearch(word);
    }
}


function secuenceSearch(chain: string) : void {
    if (dnaSequence.find((value: string) => chain.indexOf(value) !== -1)) {
        mutantSequenceFound += 1;
    }
}
