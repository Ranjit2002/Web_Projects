/*

    Win                     Loss

Snake - Water           Snake - Gun
Water - Gun             Water - Snake
Gun   - Snake           Gun   - Water  

*/


const input = document.getElementById('SWG-input');
const button = document.getElementById('check-btn');

let user = document.getElementById('ur');
let computer = document.getElementById('cm');
let winner = document.getElementById('won');

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        playGame();
    }
});

button.addEventListener('click', playGame);

function playGame() {
    const userChoice = input.value.trim().toLowerCase();
    const choices = ['snake', 'water', 'gun'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Validate input
    if (!choices.includes(userChoice)) {
        alert('Please enter Snake, Water, or Gun correctly.');
        input.value = '';
        return;
    }

    let result = '';

    if (userChoice === computerChoice) {
        // result = `It's a Draw! Both choose ${userChoice.toUpperCase()}.`;
        result = "Game Draw!..."
    } 
    else if (
        (userChoice === 'snake' && computerChoice === 'water') ||
        (userChoice === 'water' && computerChoice === 'gun') ||
        (userChoice === 'gun' && computerChoice === 'snake')
    ) {
        // result = `🎉 You Win! You chose ${userChoice.toUpperCase()} and Computer chose ${computerChoice.toUpperCase()}.`;
        result = "User won!..."
    } 
    else {
        // result = `😞 You Lose! You chose ${userChoice.toUpperCase()} and Computer chose ${computerChoice.toUpperCase()}.`;
        result = "Computer won!..."
    }

    // alert(result);
    
    user.innerHTML = userChoice;
    computer.innerHTML = computerChoice;
    winner.innerHTML = result;
    
    input.value = ''; // clear input after round
}


