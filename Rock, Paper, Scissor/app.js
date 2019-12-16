// caching the dom: almacenar las referencias a las variables en una variable para llamarlas cuando
// se las necesite y no estar llamandolas como document.getElementById cada vez que se las necesite.
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissor_div = document.getElementById('scissor');

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissor'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices [randomNumber];
}

const convertToWord = (letter) => {
    if (letter === 'rock') {
        return 'Rock';
    }
    if (letter === 'paper') {
        return 'Paper';
    }
    if (letter === 'scissor') {
        return 'Scissor';
    }
}

const winner = (userChoice, computerChoice) => {
    userScore++;
    const smallUserWord = 'user'.fontsize(3).fontcolor('green').sub();
    const smallCpuWord = 'cpu'.fontsize(3).fontcolor('red').sub();
    const userChoice_div = document.getElementById(userChoice);
    // se inserta el puntaje en el marcador
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCpuWord}. You Win!`
    userChoice_div.classList.add('green-glow');
    /* setTimeout es una funcion que toma dos parametros, lo que se va a ejecutar por ej: 
    un console y el tiempo que se va a esperar para ejecutar esa instruccion, por ej: 
    2000miliseg que serian 2 segundos.
    */
   // luego de 2 seg remueve la clase green-glow, para que vuelva a ser normal el estilo.
   setTimeout(() => userChoice_div.classList.remove('green-glow'), 1000);
}

const looser = (userChoice, computerChoice) => {
    computerScore++;
    const smallUserWord = 'user'.fontsize(3).fontcolor('red').sub();
    const smallCpuWord = 'cpu'.fontsize(3).fontcolor('green').sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCpuWord}. You Lost!`
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 1000);
}

const tie = (userChoice, computerChoice) => {
    const smallUserWord = 'user'.fontsize(3).fontcolor('#999999').sub();
    const smallCpuWord = 'cpu'.fontsize(3).fontcolor('#999999').sub();
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCpuWord}. It's a draw!`
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 1000);
}

const game = (userChoice) => {
    const computerChoice = getComputerChoice();
    
    switch(userChoice + computerChoice) {
        case 'rockscissor':
        case 'paperrock':
        case 'scissorpaper':
            winner(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'paperscissor':
        case 'scissorrock':
            looser(userChoice, computerChoice);
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorscissor':
            tie(userChoice, computerChoice);
            break;
    
    }
}

const main = () => {
    rock_div.addEventListener('click', () => game('rock'));
    paper_div.addEventListener('click', () => game('paper'));
    scissor_div.addEventListener('click', () => game('scissor'));
}

main();