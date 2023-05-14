// html

const para = document.querySelector('p');

// board

let board = [];

let casesNames;
let file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let name;
let n = 0;
let Case;
let x;
let k = 0;

file.forEach(element => {
    for (let i = 0; i < 8; i++) {
        n++;
        x = element + (i+1);
        Case = {
            row: i,
            file: k,
            id: n,
            name: x,
            piece: ''
        };
        board.push(Case);
    }
    k++;
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
    } else if ((id > 7 && id < 16) && ((id % 2) == 0)) {
        i = 0 + ((id - 8) * 8);
    } else if ((id > 7 && id < 16) && ((id % 2) == 1)) {
        i = 56 - ((id - 9) * 8); 
    } else if  ((id > 23 && id <= 32) && (id % 2) == 0) {
        i = 7 + ((id - 24) * 8);
    } else if ((id > 23 && id <= 32) && (id % 2) == 1) {
        i = 63 - ((id - 25) * 8);
    }


    Case = board[i].name;
    piece.case = Case;
    board[i].piece = piece;
};

//game history and useful functions

function changeGameHistory() {
    gameHistory.push((" " + Turn + ". " + input + " "));
}

function searchPieceInBoard(array, propertyToCheck, valueToMatch, lookupProperty, typetocheck) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][lookupProperty] === valueToMatch && array[i][propertyToCheck].type === typetocheck) {
        return true;
      }
    } 
    return false;
  }

function isCaseEmpty(valueToMatch) {
    let empty;
    console.log(`isCaseEmptyis checking ${valueToMatch}`)
    for (let i = 0; i < 63; i++) {
      if (board[i]['name'] == valueToMatch) {
        board[i].piece == '' ?  empty = true : empty = false;
      } 
    } 
    return empty; 
  }

function getIDofCase(valueToMatch) {
    let IDofCase;
    console.log(`getIDofCAse is checking ${valueToMatch}`)
    for (let i = 0; i < 63; i++) {
      if (board[i]['name'] == valueToMatch) {
        IDofCase = i;
      } 
    } 
    return IDofCase; 
  }

  let casetomove;
  let PawnMove;


//start of the game 

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

// checkMove

function checkMove(input) {
    if (input.length === 2) {
        PawnMove = input;
        console.log(PawnMove + "in checkmove");
        checkPawnMove(PawnMove); 

    } else if (input.length == 3) {
        if (input.charAt(0) == 'N') {
            KnightMove = input;
            checkKnightMove();

        } else if (input.charAT(0) == 'B') {
            BishopMove = input; 
            checkBishopMove();

        } else if (input.charAT(0) == 'R') {
            RookMove = input; 
            checkRookMove();

        } else if (input.charAT(0) == 'Q') {
            BishopMove = input; 
            checkQueenMove();

        } else if (input.charAT(0) == 'K') {
            BishopMove = input; 
            checkKingMove();

        } else if (input == '0-0') {
            shortCastle();
        }

    } else if (input.length == 4) {
        if ((input.charAt(0) == 'N') && (input.charAt(1) == 'x')) {
            KnightMove = input;
            checkKnightCaptures();

        } else if ((input.charAT(0) == 'B') && (input.charAt(1) == 'x')) {
            BishopMove = input; 
            checkBishopCaptures();

        } else if ((input.charAt(0) == 'R') && (input.charAt(1) == 'x')) {
            KnightMove = input;
            checkRookCaptures();

        } else if ((input.charAT(0) == 'Q') && (input.charAt(1) == 'x')) {
            BishopMove = input; 
            checkQueenCaptures();

        } else if ((input.charAT(0) == 'K') && (input.charAt(1) == 'x')) {
            BishopMove = input; 
            checkKingCaptures();

        } else if (((input.charAt(0) == 'N') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) ) {
            KnightMove = input;
            checkKnightMove();

        } else if (((input.charAt(0) == 'B') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) ) {
            BishopMove = input; 
            checkBishopMove();

        } else if (((input.charAt(0) == 'R') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) ) {
            KnightMove = input;
            checkRookMove();

        } else if (((input.charAt(0) == 'Q') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) ) {
            BishopMove = input; 
            checkQueenMove();

        } else if (((input.charAt(0) == 'K') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) ) {
            BishopMove = input; 
            checkKingMove();

        } 

    }};


// Pawn Move

function checkPawnMove(PawnMove) {
    console.log('Pawn moves to ' + PawnMove);
    
    casetomove = checkPMpossible(PawnMove);

    if (casetomove != false) {
        movePawn(casetomove, PawnMove);
    } else {
        console.log('Pawn move is not possible')
    }
}

function checkPMpossible(PawnMove) {
    let possible;
    console.log(`${PawnMove} in checkPMpossible`);
    console.log(PawnMove.charAt(1));
    let pawnfile = PawnMove.charAt(0);
    let pawnrank = (PawnMove.charAt(1) - 1);
    let empty = isCaseEmpty(PawnMove);
    console.log(empty);
    

    if (PawnMove.charAt(1) == 4) { 
        if (searchPieceInBoard(board, "piece", `${pawnfile}3`, 'name', 'pawn') == true) {
                console.log("check d3");
                possible = true;
                casetomove = `${pawnfile}3`;
             } else if (searchPieceInBoard(board, "piece", `${pawnfile}2`, 'name', 'pawn') == true) {
                console.log("check d2");
                possible = true; 
                casetomove = `${pawnfile}2`;
            } else {
                possible = false;
            }
    } else {
        searchPieceInBoard(board, "piece", `${pawnfile}${pawnrank}`, 'name', 'pawn') == true ? possible = true : possible = false;
            casetomove = `${pawnfile}${pawnrank}`;
    }
    
    console.log(empty);
    console.log(possible);
    if ((possible == true) && (empty == true)) {
        return casetomove;
    } else {
        return false;
    }

    }

    


function movePawn(casetomove,casetomoveto) {
    let idcasetomove = getIDofCase(casetomove);
    let idcasetomoveto = getIDofCase(casetomoveto);
      board[idcasetomoveto]['piece'] = board[idcasetomove]['piece'];
      board[idcasetomove]['piece'] = '';
    }





