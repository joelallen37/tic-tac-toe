let playerText = document.getElementById('playerText');
let winnerText = document.getElementById('winnerText');
let restartButton = document.getElementById('restartButton');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks') 
 

console.log(boxes);

const O_text = "O";
const X_text = "X";

let currentPlayer = X_text; // start the game on X
let spaces = Array(9).fill(null); // create an array made of 9 empty items. will be filled with Xs & Os as the game goes on

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    // now, each item in the boxes array is looking out for when it has been clicked

}

function boxClicked (e) {
    const id = e.target.id
    // id is the id of each box given in HTML 
    // e is called to bring in boxes array
    if(!spaces[id]) {// if this box is still null...
        spaces[id] = currentPlayer // update the box to an X or O, that way the box can't be overriden
        e.target.innerText = currentPlayer // give feedback to user
       
        if (playerHasWon() !==false) { // check that false wasn't return in playerHasWon function
            winnerText.innerHTML = `${currentPlayer} wins!` // update h2 text when theres a winner 
            let winning_blocks = playerHasWon(); // get the array that was returned in the function pHW

            boxes.forEach(box => box.removeEventListener('click', boxClicked)) // prevent extra clicks onee game is over
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            // for each item in the boxes array that match the winning_blocks values, update the style
            return;
        }   

        currentPlayer = currentPlayer == X_text ? O_text: X_text
        // anything after 1st = is an if statement: "if current player = X, change to O. Else change to X. then update currentPlayer"
    }
}


// empty array used to store potential winning combos
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
] // we'll check if a user has filled all of these areas

function playerHasWon() {
    for (const condition of winningCombinations) {
        let[a, b, c]= condition // destructures the winning combo arrays and saves as 3 diffent values (a,b,c)
    
        if (spaces[a] && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]) { 
        // check: if a is not null, THEN check if a, b & c are both X or O
            return [a,b,c] // return winning combo array
        } 
    }

    return false; // if no one wins
}

restartButton.addEventListener('click', restart) // look for clicks on restart button, then run the function restart

function restart() {
    spaces.fill(null) // update all items with the value null
    boxes.forEach(box => {
        box.innerText = '' // remove the XOs from the grid to give user visual feedback
        box.style.backgroundColor='' 
        boxes.forEach(box => box.addEventListener('click', boxClicked))
        winnerText.innerHTML = `Let's Play!`;
    })

    playerText = 'Tic Tac Toe'
    currentPlayer = X_text; // reset to default player
}

startGame()