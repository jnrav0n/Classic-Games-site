// Country data with flags and abbreviations
const countries = [
    // Easy countries (5 points)
    { name: 'United States', flag: 'https://flagcdn.com/w320/us.png', abbreviations: ['us', 'usa'], difficulty: 'easy' },
    { name: 'United Kingdom', flag: 'https://flagcdn.com/w320/gb.png', abbreviations: ['uk', 'gb', 'britain'], difficulty: 'easy' },
    { name: 'France', flag: 'https://flagcdn.com/w320/fr.png', abbreviations: ['fr'], difficulty: 'easy' },
    { name: 'Germany', flag: 'https://flagcdn.com/w320/de.png', abbreviations: ['de'], difficulty: 'easy' },
    { name: 'Japan', flag: 'https://flagcdn.com/w320/jp.png', abbreviations: ['jp'], difficulty: 'easy' },
    { name: 'China', flag: 'https://flagcdn.com/w320/cn.png', abbreviations: ['cn'], difficulty: 'easy' },
    { name: 'Brazil', flag: 'https://flagcdn.com/w320/br.png', abbreviations: ['br'], difficulty: 'easy' },
    { name: 'Australia', flag: 'https://flagcdn.com/w320/au.png', abbreviations: ['au'], difficulty: 'easy' },
    { name: 'Canada', flag: 'https://flagcdn.com/w320/ca.png', abbreviations: ['ca'], difficulty: 'easy' },
    { name: 'India', flag: 'https://flagcdn.com/w320/in.png', abbreviations: ['in'], difficulty: 'easy' },
    
    // Medium countries (10 points)
    { name: 'Spain', flag: 'https://flagcdn.com/w320/es.png', abbreviations: ['es'], difficulty: 'medium' },
    { name: 'Italy', flag: 'https://flagcdn.com/w320/it.png', abbreviations: ['it'], difficulty: 'medium' },
    { name: 'Russia', flag: 'https://flagcdn.com/w320/ru.png', abbreviations: ['ru'], difficulty: 'medium' },
    { name: 'South Korea', flag: 'https://flagcdn.com/w320/kr.png', abbreviations: ['kr', 'korea'], difficulty: 'medium' },
    { name: 'Mexico', flag: 'https://flagcdn.com/w320/mx.png', abbreviations: ['mx'], difficulty: 'medium' },
    { name: 'United Arab Emirates', flag: 'https://flagcdn.com/w320/ae.png', abbreviations: ['uae'], difficulty: 'medium' },
    { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png', abbreviations: ['nz'], difficulty: 'medium' },
    { name: 'South Africa', flag: 'https://flagcdn.com/w320/za.png', abbreviations: ['za', 'sa'], difficulty: 'medium' },
    { name: 'Sweden', flag: 'https://flagcdn.com/w320/se.png', abbreviations: ['se'], difficulty: 'medium' },
    { name: 'Norway', flag: 'https://flagcdn.com/w320/no.png', abbreviations: ['no'], difficulty: 'medium' },
    
    // Hard countries (15 points)
    { name: 'Denmark', flag: 'https://flagcdn.com/w320/dk.png', abbreviations: ['dk'], difficulty: 'hard' },
    { name: 'Finland', flag: 'https://flagcdn.com/w320/fi.png', abbreviations: ['fi'], difficulty: 'hard' },
    { name: 'Netherlands', flag: 'https://flagcdn.com/w320/nl.png', abbreviations: ['nl', 'holland'], difficulty: 'hard' },
    { name: 'Belgium', flag: 'https://flagcdn.com/w320/be.png', abbreviations: ['be'], difficulty: 'hard' },
    { name: 'Switzerland', flag: 'https://flagcdn.com/w320/ch.png', abbreviations: ['ch'], difficulty: 'hard' },
    { name: 'Austria', flag: 'https://flagcdn.com/w320/at.png', abbreviations: ['at'], difficulty: 'hard' },
    { name: 'Portugal', flag: 'https://flagcdn.com/w320/pt.png', abbreviations: ['pt'], difficulty: 'hard' },
    { name: 'Greece', flag: 'https://flagcdn.com/w320/gr.png', abbreviations: ['gr'], difficulty: 'hard' },
    { name: 'Ireland', flag: 'https://flagcdn.com/w320/ie.png', abbreviations: ['ie'], difficulty: 'hard' },
    { name: 'Poland', flag: 'https://flagcdn.com/w320/pl.png', abbreviations: ['pl'], difficulty: 'hard' },
    
    // Expert countries (20 points)
    { name: 'Czech Republic', flag: 'https://flagcdn.com/w320/cz.png', abbreviations: ['cz', 'czech'], difficulty: 'expert' },
    { name: 'Hungary', flag: 'https://flagcdn.com/w320/hu.png', abbreviations: ['hu'], difficulty: 'expert' },
    { name: 'Romania', flag: 'https://flagcdn.com/w320/ro.png', abbreviations: ['ro'], difficulty: 'expert' },
    { name: 'Bulgaria', flag: 'https://flagcdn.com/w320/bg.png', abbreviations: ['bg'], difficulty: 'expert' },
    { name: 'Croatia', flag: 'https://flagcdn.com/w320/hr.png', abbreviations: ['hr'], difficulty: 'expert' },
    { name: 'Slovakia', flag: 'https://flagcdn.com/w320/sk.png', abbreviations: ['sk'], difficulty: 'expert' },
    { name: 'Slovenia', flag: 'https://flagcdn.com/w320/si.png', abbreviations: ['si'], difficulty: 'expert' },
    { name: 'Estonia', flag: 'https://flagcdn.com/w320/ee.png', abbreviations: ['ee'], difficulty: 'expert' },
    { name: 'Latvia', flag: 'https://flagcdn.com/w320/lv.png', abbreviations: ['lv'], difficulty: 'expert' },
    { name: 'Lithuania', flag: 'https://flagcdn.com/w320/lt.png', abbreviations: ['lt'], difficulty: 'expert' },
    
    // Master countries (25 points)
    { name: 'Malta', flag: 'https://flagcdn.com/w320/mt.png', abbreviations: ['mt'], difficulty: 'master' },
    { name: 'Cyprus', flag: 'https://flagcdn.com/w320/cy.png', abbreviations: ['cy'], difficulty: 'master' },
    { name: 'Luxembourg', flag: 'https://flagcdn.com/w320/lu.png', abbreviations: ['lu'], difficulty: 'master' },
    { name: 'Iceland', flag: 'https://flagcdn.com/w320/is.png', abbreviations: ['is'], difficulty: 'master' },
    { name: 'Liechtenstein', flag: 'https://flagcdn.com/w320/li.png', abbreviations: ['li'], difficulty: 'master' },
    { name: 'Andorra', flag: 'https://flagcdn.com/w320/ad.png', abbreviations: ['ad'], difficulty: 'master' },
    { name: 'San Marino', flag: 'https://flagcdn.com/w320/sm.png', abbreviations: ['sm'], difficulty: 'master' },
    { name: 'Monaco', flag: 'https://flagcdn.com/w320/mc.png', abbreviations: ['mc'], difficulty: 'master' },
    { name: 'Vatican City', flag: 'https://flagcdn.com/w320/va.png', abbreviations: ['va', 'vatican'], difficulty: 'master' },
    { name: 'Moldova', flag: 'https://flagcdn.com/w320/md.png', abbreviations: ['md'], difficulty: 'master' }
];

// Game variables
let currentCountry = null;
let score = 0;
let timeLeft = 60; // 60 seconds per flag
let timerInterval;
let usedCountries = new Set();

// DOM elements
const flagImage = document.getElementById('flagImage');
const countryInput = document.getElementById('countryInput');
const submitButton = document.getElementById('submitButton');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Initialize game
function initGame() {
    score = 0;
    usedCountries.clear();
    scoreDisplay.textContent = score;
    showNewFlag();
}

// Show a new random flag
function showNewFlag() {
    // Filter out used countries
    const availableCountries = countries.filter(country => !usedCountries.has(country.name));
    
    // If all countries have been used, reset the used countries set
    if (availableCountries.length === 0) {
        usedCountries.clear();
        availableCountries.push(...countries);
    }
    
    // Select a random country
    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    currentCountry = availableCountries[randomIndex];
    
    // Update the flag image
    flagImage.src = currentCountry.flag;
    flagImage.alt = `${currentCountry.name} Flag`;
    
    // Clear input and feedback
    countryInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    
    // Reset timer
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    startTimer();
    
    // Focus the input
    countryInput.focus();
}

// Check answer
function checkAnswer() {
    const userAnswer = countryInput.value.trim().toLowerCase();
    const correctAnswer = currentCountry.name.toLowerCase();
    const isCorrect = userAnswer === correctAnswer || 
                      currentCountry.abbreviations.includes(userAnswer);
    
    if (isCorrect) {
        // Calculate points based on difficulty and time left
        let points = getPointsForDifficulty(currentCountry.difficulty);
        points += Math.floor(timeLeft / 10); // Bonus points for quick answers
        
        score += points;
        feedback.textContent = `Correct! +${points} points (${timeLeft}s remaining)`;
        feedback.className = 'feedback correct';
        usedCountries.add(currentCountry.name);
    } else {
        feedback.textContent = `Incorrect! The answer was ${currentCountry.name}`;
        feedback.className = 'feedback incorrect';
    }
    
    scoreDisplay.textContent = score;
    setTimeout(showNewFlag, 800);
}

// Get points for difficulty level
function getPointsForDifficulty(difficulty) {
    switch(difficulty) {
        case 'easy': return 5;
        case 'medium': return 10;
        case 'hard': return 15;
        case 'expert': return 20;
        case 'master': return 25;
        default: return 10;
    }
}

// Start timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedback.textContent = `Time's up! The answer was ${currentCountry.name}`;
            feedback.className = 'feedback incorrect';
            setTimeout(showNewFlag, 800);
        }
    }, 1000);
}

// Event Listeners
submitButton.addEventListener('click', checkAnswer);

countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Initialize game on load
initGame(); 