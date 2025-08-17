class WordScrambleGame {
    constructor() {
        this.words = [
            'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'LEMON',
            'HOUSE', 'CHAIR', 'TABLE', 'WINDOW', 'DOOR',
            'HAPPY', 'SMILE', 'LAUGH', 'DANCE', 'SING',
            'OCEAN', 'BEACH', 'WAVES', 'SHELL', 'SAND',
            'FLOWER', 'GARDEN', 'PLANT', 'GRASS', 'TREE',
            'RAINBOW', 'CLOUD', 'SUNNY', 'STORM', 'WIND',
            'BUTTERFLY', 'BIRD', 'FISH', 'CAT', 'DOG',
            'BOOK', 'PENCIL', 'PAPER', 'SCHOOL', 'LEARN',
            'FRIEND', 'FAMILY', 'LOVE', 'KIND', 'HELP',
            'PIZZA', 'CAKE', 'COOKIE', 'BREAD', 'MILK',
            'STAR', 'MOON', 'PLANET', 'SPACE', 'ROCKET',
            'MAGIC', 'DREAM', 'WISH', 'HOPE', 'JOY',
            'MUSIC', 'PIANO', 'GUITAR', 'DRUM', 'SONG',
            'CASTLE', 'PRINCE', 'QUEEN', 'CROWN', 'GOLD',
            'ADVENTURE', 'EXPLORE', 'DISCOVER', 'JOURNEY', 'PATH'
        ];
        
        this.currentWord = '';
        this.scrambledWord = '';
        this.score = 0;
        this.gameActive = true;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
    }
    
    initializeElements() {
        this.scrambledWordEl = document.getElementById('scrambledWord');
        this.playerInputEl = document.getElementById('playerInput');
        this.messageEl = document.getElementById('message');
        this.scoreEl = document.getElementById('score');
        this.gameOverEl = document.getElementById('gameOver');
        this.finalScoreEl = document.getElementById('finalScore');
        this.restartBtnEl = document.getElementById('restartBtn');
        this.submitBtnEl = document.getElementById('submitBtn');
    }
    
    setupEventListeners() {
        if (this.playerInputEl) {
            this.playerInputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.gameActive) {
                    this.checkAnswer();
                }
            });
        }
        if (this.restartBtnEl) {
            this.restartBtnEl.addEventListener('click', () => this.startNewGame());
        }
        if (this.submitBtnEl) {
            this.submitBtnEl.addEventListener('click', () => {
                if (this.gameActive) {
                    this.checkAnswer();
                }
            });
        }
    }
    
    startNewGame() {
        if (this.gameOverEl) {
            this.gameOverEl.style.display = 'none';
        }
        this.score = 0;
        this.gameActive = true;
        this.updateScore();
        this.nextWord();
        if (this.playerInputEl) {
            this.playerInputEl.disabled = false;
            this.playerInputEl.value = '';
            this.playerInputEl.focus();
        }
        this.messageEl.textContent = '';
        this.messageEl.className = 'message';
    }
    
    nextWord() {
        if (!this.gameActive) return;
        
        // Clear previous messages and input
        this.messageEl.textContent = '';
        this.messageEl.className = 'message';
        this.playerInputEl.value = '';
        this.playerInputEl.focus();
        
        // Select random word
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.scrambledWord = this.scrambleWord(this.currentWord);
        
        // Make sure scrambled word is different from original
        while (this.scrambledWord === this.currentWord) {
            this.scrambledWord = this.scrambleWord(this.currentWord);
        }
        
        this.scrambledWordEl.textContent = this.scrambledWord;
    }
    
    scrambleWord(word) {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters.join('');
    }
    
    checkAnswer() {
        if (!this.gameActive) return;
        
        const playerAnswer = this.playerInputEl.value.trim().toUpperCase();
        
        if (playerAnswer === '') {
            this.showMessage('Please enter a word!', 'incorrect');
            return;
        }
        
        if (playerAnswer === this.currentWord) {
            this.correctAnswer();
        } else {
            this.showMessage('❌ Try again!', 'incorrect');
            this.playerInputEl.value = '';
            this.playerInputEl.focus();
        }
    }
    
    correctAnswer() {
        this.score += 1;
        this.updateScore();
        this.showMessage('🎉 Correct! Well done! 🎉', 'correct');
        
        // Start next word after a short delay
        setTimeout(() => {
            this.nextWord();
        }, 1500);
    }
    
    showMessage(text, type) {
        this.messageEl.textContent = text;
        this.messageEl.className = `message ${type}`;
    }
    
    updateScore() {
        this.scoreEl.textContent = this.score;
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new WordScrambleGame();
});