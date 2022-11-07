/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const displayTurn = document.getElementById("displayTurn");
var WIDTH = 7;
 var HEIGHT = 6;
 
 var currPlayer = 1; // active player: 1 or 2
 var board = []; // array of rows, each row is array of cells  (board[y][x])
 let gameOver = false; 
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
    board = [];
    for (let y = 0; y < HEIGHT; y++){ 
        let column = [];
        for (let x = 0; x < WIDTH; x++){
            column.push(null);
        }
        board.push(column)
    }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const board = document.getElementById('board')
   // TODO: add comment for this code
   var top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (var x = 0; x < WIDTH; x++) {
     var headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   board.append(top);
 
   // TODO: add comment for this code
   for (var y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     
     for (var x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     board.append(row);
   }
 }
 
 displayTurn.classList.add("p1");
 displayTurn.innerText = "Player 1's turn!";
 
 

 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
    for(let y = HEIGHT - 1; y >= 0; y--) {
        if(board[y][x] === null) return y;
      }
      return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const newPiece = document.createElement('div')
   newPiece.classList.add('piece');
    newPiece.classList.add('p' + currPlayer);
    
    let pieceLocation = document.getElementById(`${y}-${x}`);
    pieceLocation.append(newPiece);
    
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
    alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   var y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
  
   placeInTable(y, x);
   board[y][x] = currPlayer; 

 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   if (currPlayer === 1) currPlayer = 2;
      else currPlayer = 1;
 

   // update the hover of the top row for the current player
  //  topRowHoverDivs = document.querySelectorAll("#column-top td div");
  //  topRowHoverDivs.forEach(div => {
  //    div.classList.remove("p1");
  //    div.classList.remove("p2");
  //    div.classList.add(`p${currPlayer}`);
  //  });

   
   // update the heading to display which player's turn it is
   displayTurn.innerText = `Player ${currPlayer}'s turn!`;
  //  displayTurn.classList.remove("p1");
  //  displayTurn.classList.remove("p2");
   displayTurn.classList.add(`p${currPlayer}`);
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 