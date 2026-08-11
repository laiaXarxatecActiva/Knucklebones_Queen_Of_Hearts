export type BoardState = (number | null)[][];

export class ScoreSystem {

    // This function calculates the score of one column, 

    /* It checks the symbols on the columns, then takes them
    * It checks what value the symbols have
    * Initializes score to 0
    * Then it applies the logic of adding the repeated numbers
        and multiplying them for the amount of times they appear in
        that same column
    * Then it  returns the score.
    */
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
        return score;
    }

    // Calculate Scores of the 3 columns
    /** Taking the board, it checks it by columns and calculates the 
            score of each column, 
            the return returns an array of 3, 
            with the score of each column
     */
    calculateAllColumnScores(board: BoardState): number[] {
        return board.map(column => this.calculateColumnScore(column));
    }

    // Calculate the total Score
    /** Making use of the function to get the total score of
            all the columns, this makes the pertinent operations 
            to get the total socre using the  3 values of the array returned
            by calculateAllColumnScores
     */
    calculateTotalScore(board: BoardState): number {
        return this.calculateAllColumnScores(board).reduce((total, score) => total + score,0);
    }
}