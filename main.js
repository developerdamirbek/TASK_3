const readline = require('readline');
const KeyGenerator = require('./KeyGenerator');
const HMACGenerator = require('./HMACGenerator');
const GameRules = require('./GameRules');
const HelpTableGenerator = require('./HelpTableGenerator');

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
        console.log(table);
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
