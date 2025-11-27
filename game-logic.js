export class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }

    createDeck() {
        const suits = ['C', 'D', 'H', 'S'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];

        for (const suit of suits) {
            for (const value of values) {
                this.deck.push({ suit, value });
            }
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    cardValue(v) {
        if (v === 'A') return 11;
        if (['J', 'Q', 'K'].includes(v)) return 10;
        return parseInt(v, 10);
    }

    calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (card.value === 'A') aces++;
            total += this.cardValue(card.value);
        }

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }
        return total;
    }

    startNewRound() {
        this.createDeck();
        this.shuffleDeck();
        this.playerHand = [];
        this.dealerHand = [];

        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());

        return {
            playerHand: this.playerHand,
            dealerHand: this.dealerHand,
            playerScore: this.calculateHandValue(this.playerHand),
            dealerScore: this.calculateHandValue([this.dealerHand[0]])
        };
    }

    playerHit() {
        this.playerHand.push(this.deck.pop());
        return {
            playerHand: this.playerHand,
            playerScore: this.calculateHandValue(this.playerHand)
        };
    }

    dealerPlay() {
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop());
        }
        return {
            dealerHand: this.dealerHand,
            dealerScore: this.calculateHandValue(this.dealerHand)
        };
    }

    determineWinner() {
        const playerScore = this.calculateHandValue(this.playerHand);
        const dealerScore = this.calculateHandValue(this.dealerHand);

        let outcomeText;

        if (playerScore > 21) {
            this.losses++;
            outcomeText = 'You busted. Dealer wins!';
        } else if (dealerScore > 21) {
            this.wins++;
            outcomeText = 'Dealer busted. You win!';
        } else if (playerScore > dealerScore) {
            this.wins++;
            outcomeText = 'You win!';
        } else if (playerScore < dealerScore) {
            this.losses++;
            outcomeText = 'Dealer wins!';
        } else {
            this.draws++;
            outcomeText = 'Push! It\'s a draw.';
        }

        import('./save.js').then(m => {
            const payload = {
                playerCards: this.playerHand.map(c => `${c.value}${c.suit}`),
                dealerCards: this.dealerHand.map(c => `${c.value}${c.suit}`),
                bet: this.currentBet || 0,
                actions: this.actionsTaken || [],
                outcome:
                    outcomeText.startsWith('You win') ? 'win' :
                    outcomeText.includes('Dealer') ? 'lose' : 'push'
            };
            m.saveGameToServer(payload).catch(() => {});
        });

        return outcomeText;
    }
}

export const game = new BlackjackGame();
