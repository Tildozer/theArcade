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
const board = [];
let turnsTillFull;
let winner = false;
let boardSize = document.querySelector('#connectSize');
let main = document.querySelector('main');
let resetButton = document.querySelector('#reset');
// used to help create classes and board  so the game can keep track of moves.
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const alphaKey = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i : 8, j: 9};
// will create the board when players have selecthed there names.
const createBoard = () => {
  connectNum = ~~boardSize.value;
  boardLength = connectNum + 3;
  console.log(boardLength)
  for(let i = 0; i < boardLength -1; i++){
    let newRow = document.createElement('tr');
    newRow;
    main.appendChild(newRow);
    board.push([]);
    for(let j = 0; j < boardLength; j++){
      let square = document.createElement('td');
      square;
      square.style.backgroundColor = 'rgb(71, 71, 71)'
      newRow.appendChild(square);
      square.className = `${alph[i]}${[j]}`;
      board[i].push(alph[i] + [j]);
    }
  }
  main.classList.toggle('hide');
  console.log(board)
  return board;
};
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
    // compButton.className = 'hide';
    createBoard();
    boardSize.className = 'hide'
    turnsTillFull = board.length * board[0].length;

    return turnsTillFull;
  }
}

function whosTurn(){
  if(player1){
    player1 = !player1;
  } else {   
    player1 = !player1;
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
          // console.log('board', board);
          checkVerti(convert);
          checkHori(convert);
          checkDiagRight(convert);
          checkDiagLeft(convert);
          turnsTillFull--;
          ifFull();
          console.log(turnsTillFull);
          whosTurn();
        }
      }
    } 
  });

// Below are the necessary functions to verify if you have a win, or if the game continues
function didWin() {
  let title = document.querySelector('.title');
  let start = document.querySelector('.start');
  console.log
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
  } else {
    let name = namePlay2.innerText;
    namePlay2.innerText = `${name} is the winner!`;
    title.style.background = `linear-gradient( 1turn, ${colorPlay2.value}, white)`;
    start.style.background = `linear-gradient( 0.5turn, ${colorPlay2.value}, rgb(71, 71, 71))`;
    main.style.borderLeft = `3rem solid ${colorPlay2.value}`;
    main.style.borderRight = `3rem solid ${colorPlay2.value}`;
    resetButton.classList.toggle('hide');
  }
}

function countPlayTiles (currentToken, nextToken) {
  if( currentToken !== nextToken){
    winCount = 1;
  } else {
    winCount++;
  }
  // need a change when we let people choose the size of the board
  if(winCount === ~~boardSize.value){
    didWin();
    winner = true;
}
}

function checkHori(click) {
  let winCount = 1;
   for(let i = board.length - 1; i > 0; i--){
    let tokenColumn = board[i][click.className[1]];
    let previousToken = board[i - 1][click.className[1]]; 
    countPlayTiles(tokenColumn, previousToken);
      }
    }

function checkVerti(click) {
  let tokenRow = board[alphaKey[click.className[0]]];
  let num = ~~click.className[1];
  let winCount = 1;
  //hard coded
  for(let i = num + 3; i >= 0; i--){
    if(tokenRow[i] !== undefined){
      countPlayTiles( tokenRow[i], tokenRow[i + 1]);
    }
  }
}

function checkDiagRight(click) {
  let key = alphaKey[click.className[0]];
  let column = click.className[1];
  //hard coded
  let addOrSub = 4;
  let winCount = 1;
  
  for(let i = Math.ceil(board.length * 1.5); i > 0; i--){
    let startRow = +key - addOrSub;
    let startColumn = +column + addOrSub;
    addOrSub--;
    //hard coded
    if(startRow >= 0 && startRow < 6){
      if(startColumn < board[0].length){
        let start = board[startRow][startColumn];
        if(startRow + 1 >= 0 && startRow + 1 < board.length){
          if(startColumn - 1 < board[0].length){
            let next = board[startRow + 1][startColumn - 1];
            if( next !== undefined){
              countPlayTiles(start, next);
            } 
          }
        }
      }
    }
  }
}

function checkDiagLeft(click) {
  let key = alphaKey[click.className[0]];
  let column = click.className[1];
  let addOrSub = 4;
  let winCount = 1;  
  for(let i = Math.ceil(board.length * 1.5); i > 0; i--){
    let startRow = +key - addOrSub;
    let startColumn = +column - addOrSub;
    addOrSub--;
    if(startRow >= 0 && startRow < board.length){
      if(startColumn < board[0].length){
        let start = board[startRow][startColumn];
        if(start !== undefined){
          if(startRow + 1 >= 0 && startRow + 1 < board.length){
            if(startColumn - 1 < board[0].length){
              let next = board[startRow + 1][startColumn + 1]
              if(next !== undefined){
                countPlayTiles(start, next);
              }
            }
          }
        }
      }
    }
  }
}


function ifFull(){
  if(turnsTillFull === 0){
    namePlay1.innerText = 'Draw! try again.';
    namePlay2.innerText = '';
    resetButton.classList.toggle('hide');
  } 
}