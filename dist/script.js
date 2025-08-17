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
        this.gameReady = false;
        this.timer = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
    }
    
    initializeElements() {
        this.scrambledWordEl = document.getElementById('scrambledWord');
        this.playerInputEl = document.getElementById('playerInput');
        this.messageEl = document.getElementById('message');
        this.scoreEl = document.getElementById('score');
        this.timerEl = document.getElementById('timer');
        this.gameOverEl = document.getElementById('gameOver');
        this.finalScoreEl = document.getElementById('finalScore');
        this.restartBtnEl = document.getElementById('restartBtn');
        this.startBtnEl = document.getElementById('startBtn');
        this.startContainerEl = document.getElementById('startContainer');
        this.submitBtnEl = document.getElementById('submitBtn');
    }
    
    setupEventListeners() {
        if (this.playerInputEl) {
            this.playerInputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.gameStarted) {
                    this.checkAnswer();
                }
            });
        }
        if (this.restartBtnEl) {
            this.restartBtnEl.addEventListener('click', () => this.startNewGame());
        }
        if (this.submitBtnEl) {
            this.submitBtnEl.addEventListener('click', () => {
                if (this.gameStarted) {
                    this.checkAnswer();
                }
            });
        }
        if (this.startBtnEl) {
            this.startBtnEl.addEventListener('click', () => this.startGameTimer());
        }
    }
    
    startNewGame() {
        this.gameOverEl.style.display = 'none';
        this.startContainerEl.style.display = 'block';
        this.score = 0;
        this.gameActive = false;
        this.gameStarted = false;
        this.gameReady = true;
        this.updateScore();
        this.prepareWord();
        this.playerInputEl.disabled = true;
        this.timeLeft = 30;
        this.updateTimer();
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    startGameTimer() {
        if (!this.gameReady) return;
        
        this.gameStarted = true;
        this.gameActive = true;
        this.startContainerEl.style.display = 'none';
        this.playerInputEl.disabled = false;
        this.playerInputEl.focus();
        this.startTimer();
    }
    
    prepareWord() {
        // Clear previous messages and input
        this.messageEl.textContent = '';
        this.messageEl.className = 'message';
        this.playerInputEl.value = '';
        
        // Select random word
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.scrambledWord = this.scrambleWord(this.currentWord);
        
        // Make sure scrambled word is different from original
        while (this.scrambledWord === this.currentWord) {
            this.scrambledWord = this.scrambleWord(this.currentWord);
        }
        
        this.scrambledWordEl.textContent = this.scrambledWord;
    }
    
    incorrectAnswer() {
        this.showMessage(`❌ Incorrect! Try again!`, 'incorrect');
    }
    
    nextWord() {
        if (!this.gameActive) return;
        
        // Clear previous messages and input
        this.messageEl.textContent = '';
        this.messageEl.className = 'message';
        this.playerInputEl.value = '';
        this.playerInputEl.focus();
        
        // Reset timer state for new word
        this.timerStarted = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
        
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
        this.startTimer();
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
        if (!this.gameActive) return;
        
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
    
    timeUp() {
        this.showMessage(`⏰ Time's up! The word was: ${this.currentWord}`, 'incorrect');
        this.gameOver();
    }
    
    gameOver() {
        this.gameActive = false;
        
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
});