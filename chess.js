// html

const para = document.querySelector('p');

// board

let board = [];

let casesNames;
let file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let name;
let n = 0;
let Case;

file.forEach(element => {
    for (let i = 0; i < 8; i++) {
        n++;
        x = element + (i+1);
        y = id % 7;
        Case = {
            row: i,
            file: y,
            id: n,
            name: x,
            piece: ''
        };
        board.push(Case);
    }
    
});



//setup

let Turn = 1; 
let Player = 'white';
let gameHistory = [];
let input;

// pieces

let pieces = [];
let piece;
let piecesTypes = ['pawn','rook','knight','bishop','queen','king'];
let colors = ['white', 'black'];
let color;
let m = 0;

colors.forEach(element => {
    color = element;
    piecesTypes.forEach(element => {
        
        let counter = 0;
        if (element == 'pawn') {
            for (let i = 0; i < 8; i++) {
                counter++;
                piece = {
                    id: m,
                    name: `${color} ${element} n°${counter}`,
                    type: element,
                    case: '',
                    color: color
                }
                assignStartingCases(piece.id);
                m++;
                pieces.push(piece);
            }
        } else if (element == 'queen' || element == 'king') {
            piece = {
                id: m,
                name: `${color} ${element}`,
                type: element,
                case: '',
                color: color
            }
            assignStartingCases(piece.id);
            m++;
            pieces.push(piece);
        } else {
            for (let i = 0; i < 2; i++) {
                    counter++;
                piece = {
                    id: m,
                    name: `${color} ${element} n°${counter}`,
                    type: element,
                    case: '',
                    color: color
                }
                assignStartingCases(piece.id);
                m++;
                pieces.push(piece);
        }}
    })
});

function assignStartingCases(id) { 

    if (id <= 7) {
        i = id + 1 + (7 * id);
    } else if (id > 15 && id <= 23) {
        i = 6 + (8 * (id % 16));
    } else if ((id > 7 && id <16 || id > 23 && id <= 32) && (id % 2) == 0) {
        i = (id - 7) * 8;
    } else if ((id > 7 && id <16 || id > 23 && id <= 32) && (id % 2) == 1) {
        i = 64 - ((id - 8) * 8); 
    };


    Case = board[i].name;
    piece.case = Case;
    board[i].piece = piece;
};


// Start of the game

function Declare() {
    console.log(Turn);
    console.log(Player + "'s turn");
    input = prompt("What is your move ?", '');
    console.log('You played: ' + input);
    console.log(typeof(input));
    console.log(input.length);
    if (input) {
        Player = Player === 'white' ? 'black': 'white';
        changeGameHistory();
        console.log(gameHistory);
        Turn++;
        checkMove(input);
        Declare();

    } else {
        console.log("No play");
        Turn = 0;
        console.log(Turn);
    }
}

Declare();




//game history

function changeGameHistory() {
    gameHistory.push((" " + Turn + ". " + input + " "));
}

//moves function

//Pawn Move 

function searchPieceInBoard(array, propertyToCheck, valueToMatch, lookupProperty, typetocheck) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][lookupProperty] === valueToMatch && array[i][propertyToCheck].type === typetocheck) {
        return array[i].id;
      }
    } 
    return false;
  }

function isCaseEmpty(array, propertyToCheck, valueToMatch, lookupProperty) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][lookupProperty] === valueToMatch && array[i][propertyToCheck].type === '') {
        return true;
      }
    } 
    return false;
  }
  
let piecetomove;

function checkPMpossible(PawnMove) {
    let possible;
    console.log(`${PawnMove} in checkPMpossible`);
    console.log(PawnMove.charAt(1));
    let pawnfile = PawnMove.charAt(0);
    let pawnrank = (PawnMove.charAt(1) - 1);
    let empty = isCaseEmpty(board, "piece", PawnMove, "name");
    

    switch (PawnMove.charAt(1)) {
        case '4': 
            if (searchPieceInBoard(board, "piece", `${pawnfile}3`, 'name', 'pawn') != false) {
                console.log("check d3");
                possible = 1;
                piecetomove = `${pawnfile}3`;

            } else if (searchPieceInBoard(board, "piece", `${pawnfile}2`, 'name', 'pawn') != false) {
                console.log("check d2");
                possible = 1; 
                piecetomove = `${pawnfile}2`;
            } else {
                possible = 0;
            }
        
        default:
            searchPieceInBoard(board, "piece", `${pawnfile}${pawnrank}`, 'name', 'pawn') != false ? possible = 1 : possible = 0;
            piecetomove = `${pawnfile}${pawnrank}`;

    }

    if (possible === 1 && empty === true) {
        return piecetomove;
    } else {
        return false;
    }


}



let PawnMove;
function checkPawnMove(PawnMove) {
    console.log('Pawn moves to ' + PawnMove);
    piecetomove = checkPMpossible(PawnMove);

    if (piecetomove != false) {
        let i = (searchPieceInBoard(board, "piece", piecetomove, 'name') - 1);
        let k = (searchPieceInBoard(board, "piece", PawnMove, 'name') -1);
        board[k].piece = board[i].piece;
        board[i].piece = '';
        

    }


}


