const mainDisplay = document.getElementById('main-display');
const historyDisplay = document.getElementById('history-display');
const historyList = document.getElementById('history-list');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let currentInput = "";
let shouldResetScreen = false;

// --- Theme Toggle Logic ---
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// --- Core Functions ---
function appendValue(value) {
    if (mainDisplay.innerText === "0" || shouldResetScreen) {
        resetScreen();
    }
    currentInput += value;
    updateDisplay();
}

function appendFunc(func) {
    if (shouldResetScreen) resetScreen();
    
    // Formatting the input string for scientific functions
    if (func === 'sqrt') currentInput += "sqrt(";
    else if (func === 'sin') currentInput += "sin(";
    else if (func === 'cos') currentInput += "cos(";
    else if (func === 'sqr') currentInput += "^2";
    
    updateDisplay();
}

function resetScreen() {
    mainDisplay.innerText = "";
    shouldResetScreen = false;
}

function clearDisplay() {
    currentInput = "";
    mainDisplay.innerText = "0";
    historyDisplay.innerText = "";
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") mainDisplay.innerText = "0";
    else updateDisplay();
}

function updateDisplay() {
    mainDisplay.innerText = currentInput;
}

// --- Calculation Logic ---
function calculate() {
    try {
        let expression = currentInput;
        const originalExpression = currentInput;

        // Replace custom strings with Math functions
        // Handles sin/cos in degrees (more user-friendly)
        expression = expression.replace(/sin\(/g, "Math.sin(Math.PI/180*");
        expression = expression.replace(/cos\(/g, "Math.cos(Math.PI/180*");
        expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
        expression = expression.replace(/\^2/g, "**2");

        // Simple check for unclosed parenthesis
        const openParenthesis = (expression.match(/\(/g) || []).length;
        const closeParenthesis = (expression.match(/\)/g) || []).length;
        for (let i = 0; i < openParenthesis - closeParenthesis; i++) {
            expression += ")";
        }

        let result = eval(expression);

        // Format result (prevent long decimals)
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(4));
        }

        historyDisplay.innerText = originalExpression + " =";
        mainDisplay.innerText = result;
        
        addToHistory(originalExpression, result);
        
        currentInput = result.toString();
        shouldResetScreen = true;

    } catch (error) {
        mainDisplay.innerText = "Error";
        currentInput = "";
        shouldResetScreen = true;
    }
}

function addToHistory(expr, res) {
    const li = document.createElement('li');
    li.innerText = `${expr} = ${res}`;
    historyList.prepend(li); // Newest on top
}

// --- Keyboard Support ---
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendValue(e.key);
    if (e.key === '.') appendValue('.');
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) appendValue(e.key);
});