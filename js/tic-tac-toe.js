// Just a user friendly tic-tac-toe game
// Basically this a Beginner's project


const tic_tac_toe = {
    // Game state variables
    board: ['','','','','','','','',''],
    symbols: ['O', 'X'], // Player symbols
    currentPlayer: 0, // Index for current player
    gameover: false,
    container_element: null,

    // Winning patterns
    winning_sequences: [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]           // Diagonals
    ],

    // Initialize game with a container
    init(container) {
        this.container_element = container;
        this.start();
    },

    // Handle player move
    make_play(position) {
        if (this.gameover || this.board[position] !== '') {
            console.log("Invalid move!");
            return;
        }

        // Place symbol and update board
        this.board[position] = this.symbols[this.currentPlayer];
        this.draw();

        // Check if there's a winner
        if (this.check_winner()) {
            this.gameover = true;
            console.log(`Player ${this.symbols[this.currentPlayer]} wins!`);
            return;
        }

        // Check if it's a draw
        if (!this.board.includes('')) {
            this.gameover = true;
            console.log("It's a draw!");
            return;
        }

        // Switch player turn
        this.currentPlayer = (this.currentPlayer === 0) ? 1 : 0;
    },

    // Check if there's a winner
    check_winner() {
        for (let sequence of this.winning_sequences) {
            let [a, b, c] = sequence;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlight_winner(sequence);
                return true;
            }
        }
        return false;
    },

    // Highlight winning sequence
    highlight_winner(sequence) {
        sequence.forEach(pos => {
            this.container_element.children[pos].classList.add('winner');
        });
    },

    // Restart the game
    restart() {
        if (confirm("Are you sure you want to restart?")) {
            this.start();
        }
    },

    // Start a new game
    start() {
        this.board = ['','','','','','','','',''];
        this.gameover = false;
        this.currentPlayer = 0;
        this.draw();
    },

    // Draw the board in the HTML container
    draw() {
        this.container_element.innerHTML = '';
        for (let i = 0; i < this.board.length; i++) {
            let cell = document.createElement("div");
            cell.innerText = this.board[i];
            cell.onclick = () => this.make_play(i);
            this.container_element.appendChild(cell);
        }
    }
};
