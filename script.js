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
        this.timeLeft = 30;
        this.gameActive = false;
        this.gameStarted = false;
        this.timer = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
    }
    
    initializeElements() {
        this.scrambledWordEl = document.getElementById('scrambledWord');
        this.playerInputEl = document.getElementById('playerInput');
        this.submitBtnEl = document.getElementById('submitBtn');
        this.messageEl = document.getElementById('message');
        this.scoreEl = document.getElementById('score');
        this.timerEl = document.getElementById('timer');
        this.gameOverEl = document.getElementById('gameOver');
        this.finalScoreEl = document.getElementById('finalScore');
        this.restartBtnEl = document.getElementById('restartBtn');
    }
    
    setupEventListeners() {
        this.submitBtnEl.addEventListener('click', () => this.checkAnswer());
        this.playerInputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        this.restartBtnEl.addEventListener('click', () => this.startNewGame());
        this.readyBtnEl.addEventListener('click', () => this.startFirstGame());
        
        // Focus input when page loads
        // Don't focus input until game starts
    }
    
    startNewGame() {
        this.score = 0;
        this.gameActive = true;
        this.gameOverEl.style.display = 'none';
        this.updateScore();
        this.nextWord();
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
        
        // Reset and start timer
        this.timeLeft = 30;
        this.updateTimer();
        
        // Only start timer if game has actually started
        if (this.gameStarted) {
            this.startTimer();
        }
    }
    
    scrambleWord(word) {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters.join('');
    }
    
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimer() {
        this.timerEl.textContent = this.timeLeft;
        
        // Add warning animation when time is low
        if (this.timeLeft <= 10) {
            this.timerEl.classList.add('warning');
        } else {
            this.timerEl.classList.remove('warning');
        }
    }
    
    checkAnswer() {
        if (!this.gameActive || !this.gameStarted) return;
        
        const playerAnswer = this.playerInputEl.value.trim().toUpperCase();
        
        if (playerAnswer === '') {
            this.showMessage('Please enter a word!', 'incorrect');
            return;
        }
        
        if (playerAnswer === this.currentWord) {
            this.correctAnswer();
        } else {
            this.incorrectAnswer();
        }
    }
    
    correctAnswer() {
        this.score += Math.max(1, Math.floor(this.timeLeft / 3)); // Bonus points for speed
        this.updateScore();
        this.showMessage('🎉 Correct! Well done! 🎉', 'correct');
        
        // Clear timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Start next word after a short delay
        setTimeout(() => {
            this.nextWord();
        }, 1500);
    }
    
    incorrectAnswer() {
        this.showMessage(`❌ Try again! The word was: ${this.currentWord}`, 'incorrect');
        this.gameOver();
    }
    
    timeUp() {
        this.showMessage(`⏰ Time's up! The word was: ${this.currentWord}`, 'incorrect');
        this.gameOver();
    }
    
    gameOver() {
        this.gameActive = false;
        this.gameStarted = false;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.finalScoreEl.textContent = this.score;
        
        setTimeout(() => {
            this.gameOverEl.style.display = 'block';
        }, 2000);
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
    // Show initial scrambled word but don't start timer
    game.scrambledWordEl.textContent = "READY?";
});