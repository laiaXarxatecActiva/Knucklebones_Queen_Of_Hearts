export type BoardState = (number | null)[][];

export class ScoreSystem {

    // Calculates the socre of one column.
    
    // [3, 2, 3]
    // ((3+3)*2) + 2 = 12 + 2 = 14

    // [2, 2, 2] 
    // (2+2+2)*3 = 18

    calculateColumnScore(column: (number | null)[]) : number {
        const symbols = column.filter(
            (value): value is number => value !== null
        );

        let score = 0;
        
        for (const value of symbols) {
            const repetitions = symbols.filter(
                symbol => symbol === value
            ).length;

            score += value * repetitions;
        }

        /*    
        for (let i = 0; i <= symbols.length; i++) {
            let value = symbols[i];
            const occurrences = symbols.filter(
                symbol => symbol === value
            ).length;

            score += value * occurrences;
        }

        */

        return score;
    }

    // Calculate Scores of the 3 columns

    calculateAllColumnScores(board: BoardState): number[] {
        return board.map(column => this.calculateColumnScore(column));
    }

    // Calculate the total Score

    calculateTotalScore(board: BoardState): number {
        return this.calculateAllColumnScores(board).reduce((total, score) => total + score,0);
    }
}