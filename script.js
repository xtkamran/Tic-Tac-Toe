const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');


let currentPLayer='X';
let nextPlayer='O';
let playerTurn = currentPLayer;

player1.textContent = `Player 1 : ${currentPLayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

// Function to start your game
const startGame = () => {
    gameCells.forEach(cell =>{ 
        cell.addEventListener('click',handleClick)
    });
}


const handleClick = (e) => {
    if( e.target.textContent === ''){
        e.target.textContent=playerTurn;
        if(checkWin()){
           // console.log(`${playerTurn} is a winner!`);
            showAlert(`${playerTurn} is a winner!`);
            disableCells();
        }
        else if(checkTie()){
            //console.log(`It's a tie!`);
            showAlert(`It's a tie!`);
            disableCells();
        }
        else{
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn}`)
        }
        //checkWin();               
    }
}
// Function to  change player turn
const changePlayerTurn = () => {
    if(playerTurn === currentPLayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn=currentPLayer;
    }
    //playerTurn = playerTurn === currentPLayer ? nextPlayer : currentPLayer;
}

// Function to check which player id win
const checkWin = () => {
    const winingConditions =
        [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
    for(let i=0; i< winingConditions.length; i++){
        const [pos1, pos2, pos3] =winingConditions[i];
        
        if(gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent && 
            gameCells[pos2].textContent === gameCells[pos3].textContent) {
                return true;
        }
    }
    return false;
}

//Function to check game is tie
const checkTie = () => {
    let emptyCellCount=0;
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellCount++;
        }
    });

    return emptyCellCount === 0 && !checkWin();
}

//Function foe disable the game.
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
}


//Restart button
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

//Function to show alert.
const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(()=> {
        alertBox.style.display = "none";
    },10000);
}
restartBtn.addEventListener('click',restartGame);
startGame();