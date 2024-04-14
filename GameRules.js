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

module.exports = GameRules;
