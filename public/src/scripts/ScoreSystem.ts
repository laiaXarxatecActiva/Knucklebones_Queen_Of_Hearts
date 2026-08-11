export class ScireSystem {

    // Calculates the socre of one column.
    
    // [3, 2, 3]
    // ((3+3)*2) + 2 = 12 + 2 = 14

    // [2, 2, 2] 
    // (2+2+2)*3 = 18

    calculateColumnScore(column: number[]) : number {
        let score = 0;
        
        /*for (const value of column) {
            const occurrences = column.filter(
                symbol => symbol === value
            ).length;

            score += value * occurrences;
        }*/

        for (let i = 0; i <= column.length; i++) {
            let value = column[i];
            const occurrences = column.filter(
                symbol => symbol === value
            ).length;

            score += value * occurrences;
        }

        return score;
    }

    // Calculate Scores of the 3 columns

    calculateAllColumnScores(board: number[][]): number[] {
        return board.map(columns => this.calculateColumnScore(columns));
    }

    // Calculate the total Score

    calculateTotalScore(board: number[][]): number {
        const columnScores = this.calculateAllColumnScores(board);

        return columnScores.reduce((total, score) => total + score,0);
    }
}