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
        
        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
    }
    
    initializeElements() {
        this.scrambledWordEl = document.getElementById('scrambledWord');
        this.playerInputEl = document.getElementById('playerInput');
        this.messageEl = document.getElementById('message');
        this.scoreEl = document.getElementById('score');
        this.submitBtnEl = document.getElementById('submitBtn');
        this.helpGuideEl = document.getElementById('helpGuide');
        this.helpBtnEl = document.getElementById('helpBtn');
        this.closeHelpBtnEl = document.getElementById('closeHelpBtn');
    }
    
    setupEventListeners() {
        if (this.playerInputEl) {
            this.playerInputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
            });
        }
        if (this.submitBtnEl) {
            this.submitBtnEl.addEventListener('click', () => {
                this.checkAnswer();
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
    }
    
    showHelp() {
        if (this.helpGuideEl) {
            this.helpGuideEl.classList.remove('help-hidden');
        }
    }
    
    hideHelp() {
        if (this.helpGuideEl) {
            this.helpGuideEl.classList.add('help-hidden');
        }
    }
    
    startNewGame() {
        this.score = 0;
        this.updateScore();
        this.nextWord();
    }
    
    nextWord() {
        if (this.playerInputEl) {
            this.playerInputEl.value = '';
            this.playerInputEl.focus();
        }
        if (this.messageEl) {
            this.messageEl.textContent = '';
            this.messageEl.className = 'message';
        }
        
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
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
        if (!this.playerInputEl) return;
        
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
    
    updateScore() {
        if (this.scoreEl) {
            this.scoreEl.textContent = this.score;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WordScrambleGame();
});