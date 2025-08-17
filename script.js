class WordScrambleGame {
    constructor() {
        this.wordsByDifficulty = {
            easy: [
                'CAT', 'DOG', 'SUN', 'FUN', 'RUN', 'HAT', 'BAT', 'RAT',
                'FISH', 'BIRD', 'TREE', 'BOOK', 'CAKE', 'GAME', 'LOVE', 'HELP',
                'STAR', 'MOON', 'PLAY', 'SING', 'JUMP', 'SWIM', 'WALK', 'TALK'
            ],
            medium: [
                'APPLE', 'HOUSE', 'HAPPY', 'OCEAN', 'MUSIC', 'MAGIC', 'SMILE',
                'DANCE', 'LAUGH', 'BEACH', 'PLANT', 'CHAIR', 'TABLE', 'WINDOW',
                'FLOWER', 'GARDEN', 'FRIEND', 'FAMILY', 'SCHOOL', 'PENCIL',
                'COOKIE', 'PLANET', 'CASTLE', 'PRINCE', 'GUITAR', 'DRAGON'
            ],
            hard: [
                'RAINBOW', 'BUTTERFLY', 'ADVENTURE', 'DISCOVER', 'JOURNEY',
                'ELEPHANT', 'MOUNTAIN', 'TREASURE', 'PRINCESS', 'DINOSAUR',
                'COMPUTER', 'SANDWICH', 'BIRTHDAY', 'VACATION', 'HOMEWORK',
                'FOOTBALL', 'SWIMMING', 'PAINTING', 'BUILDING', 'SHOPPING'
            ]
        };
        
        this.currentWord = '';
        this.scrambledWord = '';
        this.difficulty = 'medium';
        this.timerMode = 'none';
        this.timeLeft = 0;
        this.timerInterval = null;
        this.gameActive = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.showSettings();
    }
    
    initializeElements() {
        this.gameSettingsEl = document.getElementById('gameSettings');
        this.gameContentEl = document.getElementById('gameContent');
        this.difficultySelectEl = document.getElementById('difficultySelect');
        this.startGameBtnEl = document.getElementById('startGameBtn');
        this.newGameBtnEl = document.getElementById('newGameBtn');
        this.timerContainerEl = document.getElementById('timerContainer');
        this.timerEl = document.getElementById('timer');
        this.gameOverModalEl = document.getElementById('gameOverModal');
        this.playAgainBtnEl = document.getElementById('playAgainBtn');
        this.helpBtnEl = document.getElementById('helpBtn');
        this.helpModalEl = document.getElementById('helpModal');
        this.closeHelpBtnEl = document.getElementById('closeHelpBtn');
        this.scrambledWordEl = document.getElementById('scrambledWord');
        this.playerInputEl = document.getElementById('playerInput');
        this.messageEl = document.getElementById('message');
        this.submitBtnEl = document.getElementById('submitBtn');
    }
    
    setupEventListeners() {
        if (this.startGameBtnEl) {
            this.startGameBtnEl.addEventListener('click', () => {
                this.startGame();
            });
        }
        if (this.newGameBtnEl) {
            this.newGameBtnEl.addEventListener('click', () => {
                this.showSettings();
            });
        }
        if (this.playAgainBtnEl) {
            this.playAgainBtnEl.addEventListener('click', () => {
                this.showSettings();
            });
        }
        if (this.helpBtnEl) {
            this.helpBtnEl.addEventListener('click', () => {
                this.showHelp();
            });
        }
        if (this.closeHelpBtnEl) {
            this.closeHelpBtnEl.addEventListener('click', () => {
                this.hideHelp();
            });
        }
        if (this.helpModalEl) {
            this.helpModalEl.addEventListener('click', (e) => {
                if (e.target === this.helpModalEl) {
                    this.hideHelp();
                }
            });
        }
        if (this.playerInputEl) {
            this.playerInputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
                if (e.key === 'Escape') {
                    this.hideHelp();
                }
            });
        }
        if (this.submitBtnEl) {
            this.submitBtnEl.addEventListener('click', () => {
                this.checkAnswer();
            });
        }
        
        // Global escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideHelp();
            }
        });
    }
    
    showHelp() {
        if (this.helpModalEl) {
            this.helpModalEl.style.display = 'flex';
        }
    }
    
    hideHelp() {
        if (this.helpModalEl) {
            this.helpModalEl.style.display = 'none';
        }
    }
    
    showSettings() {
        this.gameActive = false;
        this.clearTimer();
        if (this.gameSettingsEl) this.gameSettingsEl.style.display = 'block';
        if (this.gameContentEl) this.gameContentEl.style.display = 'none';
        if (this.gameOverModalEl) this.gameOverModalEl.style.display = 'none';
        if (this.timerContainerEl) this.timerContainerEl.style.display = 'none';
    }
    
    startGame() {
        // Get selected difficulty
        if (this.difficultySelectEl) {
            this.difficulty = this.difficultySelectEl.value;
        }
        
        // Get selected timer mode
        const timerRadios = document.querySelectorAll('input[name="timerMode"]');
        timerRadios.forEach(radio => {
            if (radio.checked) {
                this.timerMode = radio.value;
            }
        });
        
        // Setup timer if needed
        if (this.timerMode !== 'none') {
            this.timeLeft = parseInt(this.timerMode);
            if (this.timerContainerEl) this.timerContainerEl.style.display = 'block';
            this.updateTimer();
            this.startTimer();
        } else {
            if (this.timerContainerEl) this.timerContainerEl.style.display = 'none';
        }
        
        // Show game content and hide settings
        if (this.gameSettingsEl) this.gameSettingsEl.style.display = 'none';
        if (this.gameContentEl) this.gameContentEl.style.display = 'block';
        
        // Start the game
        this.gameActive = true;
        this.nextWord();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.gameOver();
            }
        }, 1000);
    }
    
    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        if (this.timerEl) {
            this.timerEl.textContent = this.timeLeft;
        }
    }
    
    gameOver() {
        this.gameActive = false;
        this.clearTimer();
        if (this.gameOverModalEl) this.gameOverModalEl.style.display = 'flex';
    }
    
    nextWord() {
        if (!this.gameActive) return;
        
        if (this.playerInputEl) {
            this.playerInputEl.value = '';
            this.playerInputEl.focus();
        }
        if (this.messageEl) {
            this.messageEl.textContent = '';
            this.messageEl.className = 'message';
        }
        
        const wordsForDifficulty = this.wordsByDifficulty[this.difficulty];
        this.currentWord = wordsForDifficulty[Math.floor(Math.random() * wordsForDifficulty.length)];
        this.scrambledWord = this.scrambleWord(this.currentWord);
        
        while (this.scrambledWord === this.currentWord) {
            this.scrambledWord = this.scrambleWord(this.currentWord);
        }
        
        if (this.scrambledWordEl) {
            this.scrambledWordEl.textContent = this.scrambledWord;
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
    
    checkAnswer() {
        if (!this.playerInputEl || !this.gameActive) return;
        
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
        this.showMessage('🎉 Correct! Well done! 🎉', 'correct');
        
        setTimeout(() => {
            this.nextWord();
        }, 1500);
    }
    
    showMessage(text, type) {
        if (this.messageEl) {
            this.messageEl.textContent = text;
            this.messageEl.className = `message ${type}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WordScrambleGame();
});