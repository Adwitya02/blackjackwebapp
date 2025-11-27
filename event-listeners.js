import { game } from './game-logic.js';
import { DomManager } from './dom-updates.js';

function enableButtons(state) {
    document.getElementById('hit').disabled = !state;
    document.getElementById('stand').disabled = !state;
}

export function initializeEventListeners() {
    document.getElementById('deal').addEventListener('click', () => {
        const { playerHand, dealerHand, playerScore } = game.startNewRound();
        DomManager.updateCards(playerHand, 'player-cards', 'Player Cards');
        DomManager.updateCards([dealerHand[0]], 'dealer-cards', 'Dealer Cards (First Card)');
        DomManager.updateScores(playerScore, '?');
        enableButtons(true);
    });

    document.getElementById('hit').addEventListener('click', () => {
        const { playerHand, playerScore } = game.playerHit();
        DomManager.updateCards(playerHand, 'player-cards', 'Player Cards');
        DomManager.updateScores(playerScore, '?');

        if (playerScore > 21) {
            DomManager.showMessage(game.determineWinner());
            DomManager.updateScoreboard(game.wins, game.losses, game.draws);
            enableButtons(false);
        }
    });

    document.getElementById('stand').addEventListener('click', () => {
        enableButtons(false);
        const { dealerHand, dealerScore } = game.dealerPlay();
        const playerScore = game.calculateHandValue(game.playerHand);
        DomManager.updateCards(dealerHand, 'dealer-cards', 'Dealer Cards');
        DomManager.updateScores(playerScore, dealerScore);
        DomManager.showMessage(game.determineWinner());
        DomManager.updateScoreboard(game.wins, game.losses, game.draws);
    });

    enableButtons(false);
}

initializeEventListeners();