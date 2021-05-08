//Helper Functions


export const pushDownColumns = function(columnsArry) {
    let columns = columnsArry;
    let newColumns = [];

    columns.forEach(function(value){
        let zero =[];
        let nonZero = []
        for(let i=0; i<8; i++){
            if(value[i] === 0) {
                zero.push(0)
            } else {
                nonZero.push(value[i])
            }
        }
        let column = zero.concat(nonZero)
        newColumns.push(column)
    })
    return newColumns;
}


 export const deleteFromRows = function(rowsArry) {
    let rows = rowsArry;
    let deleteFromRows = []
    rows.forEach(function(value){
        let toDelete = checkRowToDelete(value);
        deleteFromRows.push(toDelete);
    })
    return deleteFromRows
}

export const deleteFromColumns = function(columnsArry) {
    let columns = columnsArry;
    let deleteFromColumns = [];

    columns.forEach(function(value){
        let toDelete = checkColumnToDelete(value);
        deleteFromColumns.push(toDelete);

    })
    return deleteFromColumns
}



export const checkRowToDelete = function(row) {
    let toDelete =[];
    let i=0;
    while(i<6) {
      if(i<4 && !(row[i] === row[i-1] && row[i] === row[i-2])) {
        if (row[i] === row[i+1] && row[i+1] === row[i+2]) {
          toDelete.push(i);
          toDelete.push(i+1);
          toDelete.push(i+2);
          i+=3;
        } else {
            toDelete.push(9)
          i++
        }
      } else if(i>2) {
          if((row[i] === row[i-1]) && (toDelete.includes(i-1))) {
            toDelete.push(i);
            i++;
          } else {
            toDelete.push(9)
            i++
          }
        } 
    }
    return toDelete;
  }

  export const checkColumnToDelete = function(column) {
    let toDelete =[];
    let i=0;
    while(i<8) {
      if(i<6 && !(column[i] === column[i-1] && column[i] === column[i-2])) {
        if (column[i] === column[i+1] && column[i+1] === column[i+2]) {
          toDelete.push(i);
          toDelete.push(i+1);
          toDelete.push(i+2);
          i+=3;
        } else {
            toDelete.push(9);
          i++
        }
      } else if(i>2) {
          if((column[i] === column[i-1]) && (toDelete.includes(i-1))) {
            toDelete.push(i);
            i++;
          } else {
            toDelete.push(9);
            i++
          }
        } 
    }
    return toDelete;
  }

  
  

export const randomCell = function() {
    let int = Math.floor(2 + (Math.random() * 6));
    return int;
}

export const getRandCellWithout = function(x,y) {
    let int = randomCell()
    while(int === x || int === y) {
        int = randomCell()
    }
    return int;
}

export const checkRows = function(rows) {
    let arry =[]; 
    rows.forEach(function(value) {
        let currVal; 
        let accumulator=0;
        for(let i=0; i<(5); i++) {
            currVal = value[i]
            if((currVal === value[i+1]) && (currVal !== 1) && (currVal !== 0)) {
                accumulator++;
            } else {
                accumulator = 0;
            } 

            if(accumulator >= 2){
              arry.push(true);
            }           
        }
    })
    return arry;
}

export const checkColumns = function(columns) {
    let arry =[]; 
    columns.forEach(function(value) {
        let currVal; 
        let accumulator=0;
        for(let i=0; i<(8); i++) {
            currVal = value[i]
            if((currVal === value[i+1]) && (currVal !== 1) && (currVal !== 0)) {
                accumulator++;
            } else {
                accumulator = 0;
            } 

            if(accumulator >= 2){
              arry.push(true);
            }           
        }
    })
    return arry;
}
 
export  const makeRows = function(board) {
     let rows= [];
     for (let i=0; i<board.length; i+=6) {
         let row =[]; 
         for(let j=i; j<(6+i); j++) {
             let cell = board[j]
             row.push(cell);
         }
         rows.push(row);
     }
     return rows;
 }



 export const makeColumns = function(board) {
     let columns =[];
     for(let i=0; i<6; i++) {
         let column=[];
         for(let j=i; j<board.length; j+=6){
             let cell =board[j]
             column.push(cell)
         }
         columns.push(column);
     }
     return columns;
 }


 export const fillBoard = function(board){
     let boardHolder = board;
     for(let y=0; y<8; y++) {
         for(let x=0; x<6; x++){
                let notX = 0;
                let notY = 0;
                if(y>1){
                    if(boardHolder[y-1][x] === boardHolder[y-2][x]) {
                        notY= board[y-1][x]
                    }
                }
                if(x>1) {
                    if(boardHolder[y][x-1] === boardHolder[y][x-2]) {
                        notX= boardHolder[y][x-1]
                    }
                }
                boardHolder[y][x] = getRandCellWithout(notX,notY);
         }
     }
     return boardHolder;
 }



 export const getBoardFromRows = function(rows) {
     let board =[]
     rows.forEach(function(value){
         value.forEach(function(value) {
             board.push(value);
         })
     })

     return board;

 }

 export const getBoardFromColumns = function(columns) {
    let board =[]
    for(let i =0; i<8; i++) {
        columns.forEach(function(value) {
            board.push(value[i])
        })
    }
    return board;

}




export function board() {
    this.boardArry = this.makeBoard();    
}

//getters and setters

board.prototype.setBoardArry = function(boardArry) {this.boardArry = boardArry;}
board.prototype.getBoardArry = function() {return this.boardArry;}

    

//board functions 

board.prototype.makeBoard = function() {
    let board=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    board = fillBoard(makeRows(board));
    board = getBoardFromRows(board);
    return board; 
}

board.prototype.pointCollector = function() {
    let board = this.getBoardArry();
    board = board.reduce(function(accumulator, currentValue) {
        if (currentValue === 0) {
            return accumulator++;
        } else {
            return accumulator;
        }
    })
}

board.prototype.pushDownBoard = function() {
    let newboard = pushDownColumns(makeColumns(this.getBoardArry()));
    newboard = getBoardFromColumns(newboard);
    return newboard;
}

board.prototype.validMove = function(x,y) {
    let initial = x;
    let destination = y;
    let valid = [(parseInt(initial)-6), (parseInt(initial)-1), (parseInt(initial)+1), (parseInt(initial)+6)];
    console.log(valid);
    if(valid.includes(parseInt(destination))) {
        return true;
    } else {
        return false;
    }
}

board.prototype.swapIfValid = function(x,y) {
    if(this.validMove(x,y)) {
        let one = this.boardArry[x];
        let two = this.boardArry[y];
        let board = [...this.boardArry];
        board[x] =two;
        board[y]=one;
        let checkedRows = checkRows(makeRows(board));    
        let checkedColumns = checkColumns(makeColumns(board))
            if((checkedRows.length > 0) || (checkedColumns.length > 0)) {
                 return board;
            } else {
                return this.boardArry;
            }
        }
    else return this.boardArry;
} 

board.prototype.movesLeft = function(){
    let board = [...this.boardArry];
    let checkedRows = checkRows(makeRows(board));    
    let checkedColumns = checkColumns(makeColumns(board))
    if((checkedRows.length > 0) || (checkedColumns.length > 0)) {
        return true;
   } else {
       return false;
   }

}

board.prototype.deleteFromBoard = function() {
    let board = [...this.boardArry];
    let toDeletefromRows = getBoardFromRows(deleteFromRows(makeRows(board)));
    let toDeleteFromColumns = getBoardFromColumns(deleteFromColumns(makeColumns(board)));
    board = board.map(function(value, index) {
        if(toDeletefromRows[index] === 9  && toDeleteFromColumns[index] === 9) {
            return value;
        } 
        else {
            return 0;
        }
    })

    return board;
}





 

