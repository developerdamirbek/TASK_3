const Table = require('cli-table');

class HelpTableGenerator {
    static generateTable(moves) {
        const table = new Table({
            head: ['v PC\\User >', ...moves.map(move => move.charAt(0).toUpperCase() + move.slice(1))]
        });

        // Define the results matrix
        const results = Array.from({ length: moves.length }, () => Array(moves.length).fill(''));

        for (let i = 0; i < moves.length; i++) {
            for (let j = 0; j < moves.length; j++) {
                if (i === j) {
                    results[i][j] = 'Draw';
                } else if ((j - i + moves.length) % moves.length === 1 || (j - i + moves.length) % moves.length > Math.floor(moves.length / 2) + 1) {
                    results[i][j] = 'Win';
                } else {
                    results[i][j] = 'Lose';
                }
            }
        }

        // Populate the table
        for (let i = 0; i < moves.length; i++) {
            const row = [moves[i].charAt(0).toUpperCase() + moves[i].slice(1)];
            for (let j = 0; j < moves.length; j++) {
                row.push(results[i][j]);
            }
            table.push(row);
        }

        // Add some text before the table
        const intro = "The table below shows the outcomes of each move against other moves from the user's perspective:\n";
        console.log(intro);

        // Customize header row with colors
        const formattedHeader = table.options.head.map(cell => `\x1b[1m\x1b[36m${cell}\x1b[0m`);
        table.options.head = formattedHeader;

        return table.toString();
    }
}

module.exports = HelpTableGenerator;
