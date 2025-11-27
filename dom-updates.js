export class DomManager {
    static updateCards(hand, containerId, title = '') {
        const container = document.getElementById(containerId);
        container.innerHTML = title ? `<h3>${title}</h3>` : '';

        const cardsHtml = hand
            .map(card => `<span class="card">${this.getCardSymbol(card)}</span>`)
            .join('');

        container.innerHTML += `<div class="cards">${cardsHtml}</div>`;
    }

    static getCardSymbol(card) {
        const suitSymbols = { C: '♣', D: '♦', H: '♥', S: '♠' };
        return `${card.value}${suitSymbols[card.suit]}`;
    }

    static updateScores(playerScore, dealerScore) {
        document.getElementById('player-sum').textContent = playerScore;
        document.getElementById('dealer-sum').textContent = dealerScore;
    }

    static updateScoreboard(wins, losses, draws) {
        document.getElementById('wins').textContent = wins;
        document.getElementById('losses').textContent = losses;
        document.getElementById('draws').textContent = draws;
    }

    static showMessage(message) {
        const el = document.getElementById('game-message');
        el.textContent = message;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
    }
}