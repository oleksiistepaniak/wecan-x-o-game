
export class BoardMakerService {
    constructor() {
    }

    checkForEqualityNumberOfRowsAndNumberOfColumns(numberOfRows: number, numberOfColumns: number): string | boolean {
        return numberOfRows !== numberOfColumns ?
            'The number of rows must equal to the number of columns' :
            true;
    }
}