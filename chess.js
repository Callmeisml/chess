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
        i = 0 + ((id - 8) * 4);
    } else if ((id > 7 && id < 16) && ((id % 2) == 1)) {
        i = 56 - ((id - 9) * 4);
    } else if  ((id > 23 && id <= 32) && (id % 2) == 0) {
        i = 7 + ((id - 24) * 4);
    } else if ((id > 23 && id <= 32) && (id % 2) == 1) {
        i = 63 - ((id - 25) * 4);
    }


    Case = board[i].name;
    piece.case = Case;
    board[i].piece = piece;
};

//game history and useful functions

function changeGameHistory() {
    if (Player == 'white') {
        gameHistory.push((" " + Turn + ". " + input + " "));
    } else if (Player == 'black') {
        gameHistory.push((" ." + input + " "));
    }
    
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
    console.log(`isCaseEmpty is checking ${valueToMatch}`)
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

  function whatColorOfPiece(Case) {
    console.log(`whatColorOfPiece is checking ${Case}`)
    i = getIDofCase(Case);
    let colorofpiece = board[i]['piece'].color;
    console.log(board[i]['piece'].color)
    return colorofpiece;
  }

  function ULdiagonal(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id - 7;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id - 7;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function URdiagonal(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id + 9;
    while (id < 64 && id >= 0 &&  isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id + 9;
    } 
    if (id < 64 && id >= 0 &&  board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function DLdiagonal(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id - 9;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id - 9;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function DRdiagonal(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id + 7;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id + 7;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function Diagonals(Case) {
    let scopes = [];
    scopes.push(ULdiagonal(Case));
    scopes.push(URdiagonal(Case));
    scopes.push(DLdiagonal(Case));
    scopes.push(DRdiagonal(Case));
    return scopes;
  }

  function uLane(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id + 1;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id + 1;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function lLane(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id - 8;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id - 8;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function rLane(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id + 8;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id + 8;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function dLane(Case) {
    let scope = [];
    id = getIDofCase(Case);
    id = id - 1;
    while (id < 64 && id >= 0 && isCaseEmpty(board[id].name) == true) {
        scope.push(id);
        id = id - 1;
    } 
    if (id < 64 && id >= 0 && board[id]['piece'].color != Player) {
        scope.push(id);
    } 
    return scope;
  }

  function Lanes(Case) {
    let scopes = [];
    scopes.push(uLane(Case));
    scopes.push(lLane(Case));
    scopes.push(rLane(Case));
    scopes.push(dLane(Case));
    return scopes;
  }

  function Surroundings(Case) {
    let scope = [];
    id = getIDofCase(Case);
    surroundings = [];
    directions = [-7, 1, 9, -8, 8, -9, -1, 7];
    directions.forEach( element => {
        let idinsurrounding = id + element;
        if (idinsurrounding < 64 && idinsurrounding >= 0 && (board[idinsurrounding]['piece'].color != Player || isCaseEmpty(board[idinsurrounding].name) == true)) {
            scope.push(idinsurrounding);
        }
    })
    
    return scope;
  }

  function checkValueInArrays(value, arrayOfArrays) {
    for (let i = 0; i < arrayOfArrays.length; i++) {
      const innerArray = arrayOfArrays[i];
      if (innerArray.includes(value)) {
        return true;
      }
    }
    return false;
  }

  let casetomove;
  let PawnMove;


//start of the game 

function Declare() {
    console.log(Turn);
    console.log(Player + "'s turn");
    input = prompt("What is your move ?", '');
    console.log('You played: ' + input);
    console.log(input.length);
    if (input) {
        changeGameHistory();
        console.log(gameHistory);
        checkMove(input);
        Player === 'white' ? Player = 'black': Player = 'white';
        if (Player == 'white') {Turn++;}
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
        console.log(PawnMove + " in checkPawnkMove");
        checkPawnMove(PawnMove); 

    } else if (input.length == 3) {
        if (input.charAt(0) == 'N') {
            KnightMove = input;
            checkKnightMove();

        } else if (input.charAt(0) == 'B') {
            BishopMove = input;
            BishopMove + " in checkBishopMove"
            checkBishopMove(BishopMove);

        } else if (input.charAt(0) == 'R') {
            RookMove = input; 
            console.log(RookMove + " in checkRookMove");
            checkRookMove(RookMove);

        } else if (input.charAt(0) == 'Q') {
            QueenMove = input; 
            checkQueenMove(QueenMove);

        } else if (input.charAt(0) == 'K') {
            KingMove = input; 
            checkKingMove(KingMove);

        }}}
        
        /** 
        
        } else if (input == '0-0') {
            shortCastle();
        }

    } else if (input.length == 4) {
        if ((input.charAt(0) == 'N') && (input.charAt(1) == 'x')) {
            KnightMove = input;
            checkKnightCaptures();

        } else if ((input.charAt(0) == 'B') && (input.charAt(1) == 'x')) {
            BishopMove = input; 
            checkBishopCaptures();

        } else if ((input.charAt(0) == 'R') && (input.charAt(1) == 'x')) {
            KnightMove = input;
            checkRookCaptures();

        } else if ((input.charAt(0) == 'Q') && (input.charAt(1) == 'x')) {
            BishopMove = input; 
            checkQueenCaptures();

        } else if ((input.charAt(0) == 'K') && (input.charAt(1) == 'x')) {
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
*/

// Pawn Move

function checkPawnMove(PawnMove) {
    
    casetomove = checkPMpossible(PawnMove);

    if (casetomove != false) {
        movePiece(casetomove, PawnMove);
    } else {
        console.log('Pawn move is not possible')
    }
}



function checkPMpossible(PawnMove) {

    let possible;
    console.log(`${PawnMove} in checkPMpossible`);
    let empty = isCaseEmpty(PawnMove);
    let pawnfile;
    let pawnrank;

    if (Player == 'white') {

        pawnfile = PawnMove.charAt(0);
        pawnrank = (PawnMove.charAt(1) - 1);

        if (PawnMove.charAt(1) == 4) { 
            if (searchPieceInBoard(board, "piece", `${pawnfile}3`, 'name', 'pawn') == true) {
                console.log("check d3");
                if (whatColorOfPiece(`${pawnfile}3`) == Player) {
                    possible = true; 
                    casetomove = `${pawnfile}3`;  
                } else {
                    possible = false;
                }
            } else if (searchPieceInBoard(board, "piece", `${pawnfile}2`, 'name', 'pawn') == true) {
                console.log("check d2");
                if (whatColorOfPiece(`${pawnfile}2`) == Player) {
                    possible = true;
                    casetomove = `${pawnfile}2`;   
                } else {
                    possible = false;
                }
            } else {
                possible = false;
            }
        } else {
            searchPieceInBoard(board, "piece", `${pawnfile}${pawnrank}`, 'name', 'pawn') == true ? possible = true : possible = false;
            if (whatColorOfPiece(`${pawnfile}${pawnrank}`) == Player) {
                possible = true;
                casetomove = `${pawnfile}${pawnrank}`;   
            }  else {
                possible = false;
            }
        }

    } else if (Player == 'black') {

        pawnfile = PawnMove.charAt(0);
        pawnrank = (PawnMove.charAt(1) + 1);

        if (PawnMove.charAt(1) == 5) { 
            if (searchPieceInBoard(board, "piece", `${pawnfile}6`, 'name', 'pawn') == true) {
                console.log("check d6");
                if (whatColorOfPiece(`${pawnfile}6`) == Player) {
                    possible = true; 
                    casetomove = `${pawnfile}6`;  
                } else {
                    possible = false; 
                }
            } else if (searchPieceInBoard(board, "piece", `${pawnfile}7`, 'name', 'pawn') == true) {
                console.log("check d7");
                if (whatColorOfPiece(`${pawnfile}7`) == Player) {
                    possible = true;
                    casetomove = `${pawnfile}7`;   
                } else {
                    possible = false;
                }
            } else {
                possible = false;
            }
        } else { 
            if ((whatColorOfPiece(`${pawnfile}${pawnrank}`) == Player) && (searchPieceInBoard(board, "piece", `${pawnfile}${pawnrank}`, 'name', 'pawn') == true)) {
                possible = true;
                casetomove = `${pawnfile}${pawnrank}`;   
            }  else {
                possible = false;
            }
        }

    }

    console.log(casetomove)
    console.log(Player + ' ' + whatColorOfPiece(casetomove))
    console.log(empty);
    console.log(possible);
    if ((possible == true) && (empty == true)) {
        return casetomove;
    } else {
        return false;
    }

    }

    // Bishop Move

    function checkBishopMove(BishopMove) {
        casetomove = checkBMpossible(BishopMove);
        console.log(casetomove);
        let casetomoveto = BishopMove.slice(-2);
    
        if (casetomove != false) {
            movePiece(casetomove, casetomoveto);
        } else {
            console.log('Bishop move is not possible')
        }
    }

    function checkBMpossible(BishopMove) { 
        let casetomoveto = BishopMove.slice(-2);
        id = getIDofCase(casetomoveto);
        counter = 0; 
        for (let i = 0; i < 64; i++) {
            if (board[i]['piece'].type == 'bishop' && board[i]['piece'].color == Player) {
                let diagonals = Diagonals(board[i].name); 
                if (checkValueInArrays(id, diagonals) == true) {
                    counter++;
                    casetomove = board[i]['name'];
                } 
                return casetomove;
            }
        }
        }

    //

    function checkRookMove(RookMove) {
        casetomove = checkRMpossible(RookMove);
        console.log(casetomove);
        let casetomoveto = RookMove.slice(-2);
    
        if (casetomove != false) {
            movePiece(casetomove, casetomoveto);
        } else {
            console.log('Rook move is not possible')
        }
    }

    function checkRMpossible(RookMove) {
        let casetomoveto = RookMove.slice(-2);
        let id = getIDofCase(casetomoveto);
        console.log(id);
        let lanes = [];
        let possibleMoves = [];
      
        for (let i = 0; i < 64; i++) {
          if (board[i]['piece'].type == 'rook' && board[i]['piece'].color == Player) {
            console.log(i)
            lanes = Lanes(board[i].name);
            console.log(lanes)
            inscope = checkValueInArrays(id, lanes);
            console.log(inscope)
            if (inscope == true) {
              possibleMoves.push(board[i]['name']);
              console.log(possibleMoves)
              break;
            }
          }
        }

        console.log(possibleMoves);

        if (possibleMoves.length === 0) {
          console.log('No such rook move possible');
          return false;
        } else if (possibleMoves.length === 1) {
          console.log('Move possible');
          return possibleMoves[0];
        } else {
          console.log('More than one rook move possible');
          return possibleMoves;
        }
      }
    //

    function checkQueenMove(QueenMove) {
    casetomove = checkQMpossible(QueenMove);
        console.log(casetomove);
        let casetomoveto = QueenMove.slice(-2);
    
        if (casetomove != false) {
            movePiece(casetomove, casetomoveto);
        } else {
            console.log('Queen move is not possible')
        }
    }

    function checkQMpossible(QueenMove) {
        let casetomoveto = QueenMove.slice(-2);
        let id = getIDofCase(casetomoveto);
        let diagonals = [];
        let lanes = [];
        let possibleMoves = [];
      
        for (let i = 0; i < 64; i++) {
          if (board[i]['piece'].type == 'queen' && board[i]['piece'].color == Player) {
            lanes = Lanes(board[i].name);
            diagonals = Diagonals(board[i].name)
            diagscope = checkValueInArrays(id, diagonals);
            lanescope = checkValueInArrays(id, lanes);
            if (lanescope == true || lanescope == true) {
              possibleMoves.push(board[i]['name']);
              console.log(possibleMoves)
              break;
            }
          }
        }

        console.log(possibleMoves);

        if (possibleMoves.length === 0) {
          console.log('No such queen move possible');
          return false;
        } else if (possibleMoves.length === 1) {
          console.log('Move possible');
          return possibleMoves[0];
        } else {
          console.log('More than one queen move possible');
          return possibleMoves;
        }
      }

      //

      function checkKingMove(KingMove) {
        casetomove = checkKMpossible(KingMove);
            console.log(casetomove);
            let casetomoveto = KingMove.slice(-2);
        
            if (casetomove != false) {
                movePiece(casetomove, casetomoveto);
            } else {
                console.log('King move is not possible')
            }
        }
      

      function checkKMpossible(KingMove) {
        let casetomoveto = KingMove.slice(-2);
        let id = getIDofCase(casetomoveto);
        let casetomove = null;
        
      
        for (let i = 0; i < 64; i++) {
          if (board[i]['piece'].type == 'king' && board[i]['piece'].color == Player) {
            let surroundings = Surroundings(board[i].name);
            if (surroundings.includes(id)) {
              casetomove = board[i].name;
            } else {
                return false;
            }
          }
        }
        return casetomove;
      }
    //




function movePiece(casetomove,casetomoveto) {
    let idcasetomove = getIDofCase(casetomove);
    let idcasetomoveto = getIDofCase(casetomoveto);
    console.log(idcasetomove);
    console.log(idcasetomoveto);
    board[idcasetomoveto]['piece'] = board[idcasetomove]['piece'];
    board[idcasetomove]['piece'] = '';
    }
