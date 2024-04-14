const Table = require('cli-table');

class HelpTableGenerator {
    static generateTable(moves) {
        const table = new Table({
            head: ['', ...moves]
        });
        for (const move of moves) {
            const row = [move];
            for (const opponent of moves) {
                if (moves.indexOf(move) === moves.indexOf(opponent)) {
                    row.push("Draw");
                } else if ((moves.indexOf(move) + 1) % moves.length === moves.indexOf(opponent)) {
                    row.push("Win");
                } else {
                    row.push("Lose");
                }
            }
            table.push(row);
        }
        return table.toString();
    }
}

module.exports = HelpTableGenerator;
