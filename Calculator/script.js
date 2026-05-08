// const result = document.getElementById("result")
// const sum = document.getElementById("sum")
// const AC = document.getElementById("AC")
// const DEL = document.getElementById("DEL")
// const percent = document.getElementById("percent")
// const add = document.getElementById("add")

// const seven = document.getElementById("seven")
// const eight = document.getElementById("eight")
// const nine = document.getElementById("nine")
// const subtract = document.getElementById("subtract")

// const four = document.getElementById("four")
// const five = document.getElementById("five")
// const six = document.getElementById("six")
// const multiply = document.getElementById("multiply")

// const one = document.getElementById("one")
// const two = document.getElementById("two")
// const three = document.getElementById("three")
// const divide = document.getElementById("divide")

// const two_zero = document.getElementById("tow_zero")
// const zero = document.getElementById("zero")
// const dot = document.getElementById("dot")
// const equals_to = document.getElementById("equals_to")


// DOM Elements
const result = document.getElementById("result");
const sum = document.getElementById("sum");

// Actions & Operators
const AC = document.getElementById("AC");
const DEL = document.getElementById("DEL");
const percent = document.getElementById("percent");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equals_to = document.getElementById("equals_to");

// Numbers
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const two_zero = document.getElementById("two_zero"); // Typo fixed here
const zero = document.getElementById("zero");
const dot = document.getElementById("dot");

// State Variables
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// --- Core Calculator Functions ---

function updateDisplay() {
    // Show 0 if currentOperand is empty
    sum.innerText = currentOperand || '0';

    // Show previous calculation in the top screen
    if (operation != null) {
        // Map programming operators to standard math symbols for the UI
        let displayOp = operation;
        if (operation === '*') displayOp = '×';
        if (operation === '/') displayOp = '÷';

        result.innerText = `${previousOperand} ${displayOp}`;
    } else {
        result.innerText = '';
    }
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    // Prevent multiple decimals
    if (number === '.' && currentOperand.includes('.')) return;

    // Append the number to the current string
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    // Don't allow an operation if there's no current number
    if (currentOperand === '') return;

    // If we already have a previous number, calculate it before moving on
    if (previousOperand !== '') {
        compute();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    // Cancel if missing values
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            // Handle divide by zero
            if (current === 0) {
                clear();
                sum.innerText = "Error";
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid long floating point bugs (e.g. 0.1 + 0.2)
    currentOperand = Math.round(computation * 100000000) / 100000000;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function computePercent() {
    if (currentOperand === '') return;
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
}

// --- Event Listeners ---

// Numbers
one.addEventListener('click', () => appendNumber('1'));
two.addEventListener('click', () => appendNumber('2'));
three.addEventListener('click', () => appendNumber('3'));
four.addEventListener('click', () => appendNumber('4'));
five.addEventListener('click', () => appendNumber('5'));
six.addEventListener('click', () => appendNumber('6'));
seven.addEventListener('click', () => appendNumber('7'));
eight.addEventListener('click', () => appendNumber('8'));
nine.addEventListener('click', () => appendNumber('9'));
zero.addEventListener('click', () => appendNumber('0'));
two_zero.addEventListener('click', () => appendNumber('00'));
dot.addEventListener('click', () => appendNumber('.'));

// Operators
add.addEventListener('click', () => chooseOperation('+'));
subtract.addEventListener('click', () => chooseOperation('-'));
multiply.addEventListener('click', () => chooseOperation('*'));
divide.addEventListener('click', () => chooseOperation('/'));

// Actions
equals_to.addEventListener('click', () => {
    compute();
    updateDisplay();
});
AC.addEventListener('click', clear);
DEL.addEventListener('click', deleteNumber);
percent.addEventListener('click', computePercent);

// Initialize display on load
clear();