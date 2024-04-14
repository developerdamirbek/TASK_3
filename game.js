const readline = require('readline');
const crypto = require('crypto');

class KeyGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

class HMACGenerator {
    static generateHMAC(key, message) {
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

class GameRules {
    static determineWinner(userMove, computerMove, moves) {
        const half = Math.floor(moves.length / 2);
        if (userMove === computerMove) {
            return "Draw";
        } else if ((moves.indexOf(userMove) + half) % moves.length === moves.indexOf(computerMove)) {
            return "Computer wins";
        } else {
            return "You win";
        }
    }
}

class HelpTableGenerator {
    static generateTable(moves) {
        const table = [["", ...moves]];
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
        return table;
    }
}

function displayTable(table) {
    for (const row of table) {
        console.log(row.join('\t'));
    }
}

async function main() {
    const moves = process.argv.slice(2);
    if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
        console.log("Error: Incorrect number of moves or repeated moves.");
        console.log("Example: node game.js rock paper scissors");
        return;
    }

    const key = KeyGenerator.generateKey();
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    const hmac = HMACGenerator.generateHMAC(key, computerMove);

    console.log(`HMAC: ${hmac}`);
    console.log("Available moves:");
    for (let i = 0; i < moves.length; i++) {
        console.log(`${i + 1} - ${moves[i]}`);
    }

    console.log("0 - exit");
    console.log("? - help");

    let userMove = '';
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userMove = await new Promise((resolve) => {
        rl.question('Enter your move: ', (answer) => {
            resolve(answer);
        });
    });

    if (userMove === '?') {
        const table = HelpTableGenerator.generateTable(moves);
        displayTable(table);
    } else if (userMove === '0') {
        rl.close();
        return;
    } else if (!moves.includes(userMove)) {
        console.log("Invalid move. Please enter a valid move.");
    }

    rl.close();

    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(GameRules.determineWinner(userMove, computerMove, moves));
    console.log(`HMAC key: ${key}`);
}

main().catch((error) => console.error(error));
