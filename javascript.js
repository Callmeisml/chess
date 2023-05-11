
// html 

const para = document.querySelector('p');

//board

let FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

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
        Case = {
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
    } else if (id == 8) {
        i = 0;
    } else if (id == 9) {
        i = 56; 
    } else if (id == 10) {
        i = 8;
    } else if (id == 11) {
        i = 48;
    } else if (id == 12) {
        i = 16; 
    } else if (id == 13) {
        i = 40; 
    } else if (id == 14) {
        i = 24;
    } else if (id == 15) {
        i = 32;
    } else if (id > 15 && id <= 23) {
        i = 6 + (8 * (id % 16));
    } else if (id == 24) {
        i = 7; 
    } else if (id == 25) {
        i = 63;
    } else if (id == 26) {
        i = 15; 
    } else if (id == 27) {
        i = 55;
    } else if (id == 28) {
        i = 23;
    } else if (id == 29) {
        i = 47;
    } else if (id == 30) {
        i = 31;
    } else if (id == 31) {
        i = 39;
    }


    Case = board[i].name;
    piece.case = Case;
    board[i].piece = piece;
};




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


//

let KnightMove;
function checkKnightMove() {

}

let BishopMove;
function checkBishopMove() {

}

let RookMove;
function checkRookMove() {

}

let QueenMove;
function checkQueenMove() {

}

let KingMove;
function checkKingMove() {

}

function checkKnightCaptures() {

}

function checkBishopCaptures() {
    
} 
function checkRookCaptures() {

}

function checkQueenCaptures() {
    
}

function checkKingCaptures() {

}

function shortCastle() {

}

function longCastle() {
    
}

//check move

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



    } else if (input.length == 5) { 

        if (((input.charAt(0) == 'N') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) 
        && (input.charAt(2) == 'x')) {
            KnightMove = input;
            checkKnightCaptures();

        } else if (((input.charAt(0) == 'B') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) 
        && (input.charAt(2) == 'x')) {
            BishopMove = text; 
            checkBishopCaptures();

        } else if (((input.charAt(0) == 'R') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) 
        && (input.charAt(2) == 'x')) {
            KnightMove = input;
            checkRookCaptures();

        } else if (((input.charAt(0) == 'Q') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) 
        && (input.charAt(2) == 'x')) {
            BishopMove = input; 
            checkQueenCaptures();

        } else if (((input.charAt(0) == 'K') && ((input.charAt(1) == ('a'||'b'||'c'||'d'||'e'||'f'||'g'||'h')) || (input.charAt(1) == ('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8')) )) 
        && (input.charAt(2) == 'x')) {
            BishopMove = text; 
            checkKingCaptures();

        } else if (input == '0-0-0') {
            longCastle();
        }


    } 
}

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

/** 
function checkMove2(Input) {

    input = String(Input);
    console.log(input);
    console.log(input.length);
    console.log(typeof input);

if (input.length == 2) {
console.log (input + " in checkMove2");
} else {
    console.log("input not good size");
    console.log(input.length);
}
}
*/



/**

if (Turn % 2 === 1) {
    console.log("White's turn");
    command = prompt("What is your move ?", '');
    console.log(command);
    if (command) {
        console.log(`You played ` + command);
        Turn++
        console.log(`Turn ` + Turn);
    } else {
        Turn = 0;
        console.log(Turn);
    }


} else if (Turn % 2 === 0) {
    console.log("Black's turn");
    command = prompt("What is your move?", '');
    if (command) {
        console.log(`You played ` + command);
        Turn++
        console.log(`Turn ` + Turn);
    } else {
        Turn = 0;
        console.log(Turn);
    }
} 


// white pieces

let WPawn1 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'a2',
    currentposition: 'a2' 
}

let WPawn2 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'b2',
    currentposition: 'b2' 
}

let WPawn3 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'c2',
    currentposition: 'c2' 
}

let WPawn4 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'd2',
    currentposition: 'd2' 
}

let WPawn5 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'e2',
    currentposition: 'e2' 
}

let WPawn6 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'f2',
    currentposition: 'f2' 
}

let WPawn7 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'g2',
    currentposition: 'g2' 
}

let WPawn8 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'h2',
    currentposition: 'h2' 
}

let WRook1 = {
    type: 'rook',
    color: 'white',
    startingposition: 'a1',
    currentposition: 'a1' 
}

let WRook2 = {
    type: 'rook',
    color: 'white',
    startingposition: 'h1',
    currentposition: 'h1'
}

let WKnight1 = {
    type: 'knight',
    color: 'white',
    startingposition: 'b1',
    currentposition: 'b1' 
}

let WKnight2 = {
    type: 'knight',
    color: 'white',
    startingposition: 'g1',
    currentposition: 'g1' 
}

let WBishop1 = {
    type: 'bishop',
    color: 'white',
    startingposition: 'c1',
    currentposition: 'c1'
}

let WBishop2 = {
    type: 'bishop',
    color: 'white',
    startingposition: 'f1',
    currentposition: 'f1' 
}

let WQueen = {
    type: 'queen',
    color: 'white',
    startingposition: 'd1',
    currentposition: 'd1', 
}

let WKing = {
    type: 'King',
    color: 'white',
    startingposition: 'e1',
    currentposition: 'e1', 
}

//Black pieces

let BPawn1 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'a7',
    currentposition: 'a7' 
}

let BPawn2 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'b7',
    currentposition: 'b7' 
}

let BPawn3 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'c7',
    currentposition: 'c7' 
}

let BPawn4 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'd7',
    currentposition: 'd7' 
}

let BPawn5 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'e7',
    currentposition: 'e7' 
}

let BPawn6 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'f7',
    currentposition: 'f7' 
}

let BPawn7 = {
    type: 'pawn',
    color: 'black',
    startingposition: 'g7',
    currentposition: 'g7' 
}

let BPawn8 = {
    type: 'pawn',
    color: 'white',
    startingposition: 'h7',
    currentposition: 'h7' 
}

let BRook1 = {
    type: 'rook',
    color: 'black',
    startingposition: 'a8',
    currentposition: 'a8' 
}

let BRook2 = {
    type: 'rook',
    color: 'black',
    startingposition: 'h8',
    currentposition: 'h8'
}

let BKnight1 = {
    type: 'knight',
    color: 'black',
    startingposition: 'b8',
    currentposition: 'b8' 
}

let BKnight2 = {
    type: 'knight',
    color: 'black',
    startingposition: 'g8',
    currentposition: 'g8' 
}

let BBishop1 = {
    type: 'bishop',
    color: 'black',
    startingposition: 'c8',
    currentposition: 'c8'
}

let BBishop2 = {
    type: 'bishop',
    color: 'black',
    startingposition: 'f8',
    currentposition: 'f8' 
}

let BQueen = {
    type: 'queen',
    color: 'black',
    startingposition: 'd8',
    currentposition: 'd8' 
}

let BKing = {
    type: 'King',
    color: 'black',
    startingposition: 'e8',
    currentposition: 'e8'
}

*/ 
