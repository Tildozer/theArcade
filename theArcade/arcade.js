// player 1 variables
let player1 = true;
let play1Input = document.querySelector('#inputPlay1');
let namePlay1 = document.querySelector('#player1');
let colorPlay1 = document.querySelector('#colors1');
let buttonPlay1 = document.querySelector('#enter1');
let form = document.querySelector('#formPlay1');
// player 2 variables
let play2Input = document.querySelector('#inputPlay2');
let namePlay2 = document.querySelector('#player2');
let colorPlay2 = document.querySelector('#colors2');
let buttonPlay2 = document.querySelector('#enter2');
let form2 = document.querySelector('#formPlay2');
let compButton = document.querySelector('#compPlay');
// ect univVars
let board = [];
let turnsTillFull;
let winner = false;
let body = document.querySelector('body');
let boardSize = document.querySelector('#connectSize');
let main = document.querySelector('main');
let resetButton = document.querySelector('#reset');
console.log(resetButton);
// used to help create classes and board so the game can keep track of moves.
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const alphaKey = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i : 8, j: 9};
// will create the board when players have selecthed there names.
const createBoard = () => {
  let connectNum = ~~boardSize.value;
  let boardLength = connectNum + 3;
  for(let i = 0; i < boardLength -1; i++){
    let newRow = document.createElement('tr');
    newRow;
    main.appendChild(newRow);
    board.push([]);
    for(let j = 0; j < boardLength; j++){
      let square = document.createElement('td');
      square;
      square.style.backgroundColor = 'rgb(71, 71, 71)';
      newRow.appendChild(square);
      square.className = `${alph[i]}${[j]}`;
      board[i].push(alph[i] + [j]);
    }
  }
  main.classList.toggle('hide');
  // console.log(board);
  return board;
};
resetButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  resetButton.classList.toggle('here');
  resetButton.classList.toggle('hide');
  let connectNum = ~~boardSize.value;
  let boardLength = connectNum + 3;
  board = [];
  for(let i = 0; i < boardLength -1; i++){
    board.push([]);
    let resetBoard = main.children[i];
    console.log(resetBoard.children)
    for(let j = 0; j < boardLength; j++){
      resetBoard.children[j].style.backgroundColor = 'rgb(71, 71, 71)';
      board[i].push(alph[i] + [j]);
      winner = false;
    }
  }
  turnsTillFull = board.length * board[0].length;
  return board
} )
// input for players name and color selection.
buttonPlay1.addEventListener('click', (ev) => {
  ev.preventDefault();
  if(play1Input.value.length < 1){
    namePlay1.innerText = `Player 1`;
  }else {
    namePlay1.innerText = play1Input.value;
  } 
  namePlay1.style.color = colorPlay1.value;
  form.className = 'hide';
  startGame();
});
buttonPlay2.addEventListener('click', (ev) => {
  ev.preventDefault();
  if(play2Input.value.length < 1){
    namePlay2.innerText = `Player 2`;
  }else {
    namePlay2.innerText = play2Input.value;
  }
  namePlay2.style.color = colorPlay2.value;
  form2.className = 'hide';
  startGame();
});
//this one is checked each time a name is input so we can start when everyones ready.    
function startGame(){
  if(form.className === 'hide' && form2.className === 'hide'){
    if(colorPlay1.value === colorPlay2.value){
      colorPlay1.value = 'Crimson'
      namePlay1.style.color = colorPlay1.value;
      colorPlay2.value = '#6495ED'
      namePlay2.style.color = colorPlay2.value;
    }
    let title = document.querySelector('.title');
    title.innerHTML = `<h1>Connect ${boardSize.value}</h1>`;
    createBoard();
    prettyUpBoard();
    namePlay1.style.textDecoration = 'underline';
    boardSize.className = 'hide';
    turnsTillFull = board.length * board[0].length;
    return turnsTillFull;
  }
}

function prettyUpBoard(){
  let title = document.querySelector('.title');
  if(~~boardSize.value === 4){
    title.style.minWidth = '60rem';
    main.style.minWidth = '69rem';
  } else if(~~boardSize.value === 5){
    console.log('correct');
    title.style.minWidth = '86rem';
    body.style.minWidth = '86rem';
    main.style.minWidth = '80rem';
  } else if(~~boardSize.value === 6){
    title.style.minWidth = '91.5rem';
    main.style.minWidth = '85rem';
  } else if(~~boardSize.value === 7){
    title.style.minWidth = '101rem';
    main.style.minWidth = '95rem';
  }
}

function whosTurn(){
  if(player1){
    player1 = !player1;
    namePlay2.style.textDecoration = 'underline';
    namePlay1.style.textDecoration = 'none';
  } else {   
    player1 = !player1;
    namePlay1.style.textDecoration = 'underline';
    namePlay2.style.textDecoration = 'none';
  }
}
// determines where the lowest point on the board is for the column you click on.   
function findLowestOpen(colNum) {
  for(let i = board.length - 1; i >= 0; i--){
    let rowCheck = board[i];
    for(let j = 0; j < rowCheck.length; j++){
      columnSearch = board[i][j];
      if(columnSearch !== 'play1' && columnSearch !== 'play2'){
        if(columnSearch[1] === colNum){
          let lowest = document.querySelector(`.${columnSearch}`);
          if(player1){
            board[i][j] = 'play1'; 
          } else {
            board[i][j] = 'play2';              
          }
         // console.log('this is lowest', lowest)
           return lowest;
        }
      }
    }
  }
}

main.addEventListener('click', (ev) => {
  let click = ev.target;
    if(!winner){
      if(click.className !== ''){
        let convert = findLowestOpen(click.className[1]);
        //console.log('click', click)
        convert;
        if(convert !== undefined){
          if(player1){
            convert.style.backgroundColor = `${colorPlay1.value}`;
          } else {
            convert.style.backgroundColor = `${colorPlay2.value}`;
          }
        //  console.log('board', board);
          checkVerti(convert);
          checkHori(convert);
          checkDiagRight(convert);
          checkDiagLeft(convert);
          turnsTillFull--;
          console.log(turnsTillFull)
          ifFull();
          if(!winner){
            whosTurn();
          }
        }
      }
    } 
  });
function didWin() {
  let title = document.querySelector('.title');
  let start = document.querySelector('.start');
  if(player1){
    let name = namePlay1.innerText;
    namePlay1.innerText = `${name} is the winner!`;
    title.style.backgroundColor = colorPlay1.value;
    start.style.backgroundColor = colorPlay1.value;
    title.style.background = `linear-gradient( 1turn, ${colorPlay1.value}, white)`;
    start.style.background = `linear-gradient( 0.5turn, ${colorPlay1.value}, rgb(71, 71, 71))`;
    main.style.borderLeft = `3rem solid ${colorPlay1.value}`;
    main.style.borderRight = `3rem solid ${colorPlay1.value}`;
    resetButton.classList.toggle('hide');
    resetButton.classList.add('here');
  } else {
    let name = namePlay2.innerText;
    namePlay2.innerText = `${name} is the winner!`;
    title.style.background = `linear-gradient( 1turn, ${colorPlay2.value}, white)`;
    start.style.background = `linear-gradient( 0.5turn, ${colorPlay2.value}, rgb(71, 71, 71))`;
    main.style.borderLeft = `3rem solid ${colorPlay2.value}`;
    main.style.borderRight = `3rem solid ${colorPlay2.value}`;
    resetButton.classList.toggle('hide');
    resetButton.classList.add('here');
  }
}
// Below are the necessary functions to verify if you have a win, or if the game continues
//this is used to count up the amount in a row for each direction
function countPlayTiles (currentToken, nextToken) {
  if( currentToken !== nextToken){
    winCount = 1;
  } else {
    winCount++;
  }
  if(winCount === ~~boardSize.value){
    didWin();
    winner = true;
  } 
}  
  function checkHori(click) {
    for(let i = board.length - 1; i > 0; i--){
      let tokenColumn = board[i][click.className[1]];
    let previousToken = board[i - 1][click.className[1]]; 
    // console.log('win hori', winCount)
    countPlayTiles(tokenColumn, previousToken);
    //this is used to make sure winCout is reset to one at the end of each for loop.
    if(i === 0){
      countPlayTiles( 0, 1);
      }
    }
  }

function checkVerti(click) {
  let tokenRow = board[alphaKey[click.className[0]]];
  let num = ~~click.className[1];
  for(let i = num + ~~boardSize.value; i >= 0; i--){
    if(tokenRow[i] !== undefined){
      if(tokenRow[i + 1] !== undefined){
        countPlayTiles( tokenRow[i], tokenRow[i + 1]);
      }
    }
    if(i === 0){
      countPlayTiles( 0, 1);
    }
  }
}

function checkDiagRight(click) {
  let key = alphaKey[click.className[0]];
  let column = click.className[1];
  let addOrSub = ~~boardSize.value;
  for(let i = Math.ceil(board.length * 1.5); i >= 0; i--){
    let startRow = +key - addOrSub;
    let startColumn = +column + addOrSub;
    addOrSub--;
    if(startRow >= 0 && startRow < board[0].length - 1){
      if(startColumn < board[0].length){
        let start = board[startRow][startColumn];
        if(startRow + 1 >= 0 && startRow + 1 < board.length){
          if(startColumn - 1 < board[0].length){
            let next = board[startRow + 1][startColumn - 1];
            if( next !== undefined){
             // console.log('win count diag right', 'start', start, 'next', next);
              countPlayTiles(start, next);
            } 
          }
        }
      }
    }
    if(i === 0){
      countPlayTiles( 0, 1);
    }
  }
}

function checkDiagLeft(click) {
  let key = alphaKey[click.className[0]];
  let column = click.className[1];
  let addOrSub = ~~boardSize.value; 
  for(let i = Math.ceil(board.length * 1.5); i >= 0; i--){
    let startRow = +key - addOrSub;
    let startColumn = +column - addOrSub;
    addOrSub--;
    if(startRow >= 0 && startRow < board.length){
      if(startColumn < board[0].length){
        let start = board[startRow][startColumn];
        if(start !== undefined){
          if(startRow + 1 >= 0 && startRow + 1 < board.length){
            if(startColumn - 1 < board[0].length){
              let next = board[startRow + 1][startColumn + 1];
              // console.log('win count diag left', 'start', start, 'next', next);
              if(next !== undefined){
                countPlayTiles(start, next);
              }
            }
          }
        }
      }
    }
    if(i === 0){
      countPlayTiles( 0, 1);
    }
  }
}

function ifFull(){
  if(turnsTillFull === 0){
    namePlay1.innerText = 'Draw! try again.';
    namePlay2.innerText = '';
    resetButton.classList.toggle('hide');
    resetButton.classList.toggle('here');
  } 
}
