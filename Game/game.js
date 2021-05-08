import {board} from './boards.js'
import {nasaAPOD, quoteApi} from './api.js'


export function game () {
    this.quote ='',
    this.board = new board();
    this.HTMLBoard = this.makeHTMLBoard(this.board);
    this.gameState ={
        won: false,
        score: 0,
    }
    this.swapObservers = [];
    this.winObservers = [];
    this.loseObservers = [];
}



game.prototype.setBoard = function(board) {this.board = board;}
game.prototype.setHTML = function(HTML) {this.HTMLBoard = HTML;}
game.prototype.setgameState = function(gameState) {this.gameState = gameState;}
game.prototype.getBoard = function() {return this.board;}
game.prototype.getHTML = function() {return this.HTMLBoard}
game.prototype.getGameState = function() {return this.gameState;}

game.prototype.addListener = function (listener, event) {
    if (event === 'swap') {
    this.swapObservers.push(listener);
    }
    if(event === 'win') {
    this.winObservers.push(listener);
    }
    if(event === 'lose') {
    this.loseObservers.push(listener);
    }
};

game.prototype.update = (event) => {
    if (event === 'swap') {
        this.swapObservers.forEach((l) => {
            l(this)
        })
    }
    if(event === 'win') {
        this.winObservers.forEach((l) => {
            l(this)
        });
    }
    if(event === 'lose') {
        this.loseObservers.forEach((l) => {
            l(this)
        });
    }
};


game.prototype.makeHTMLBoard = function(board) {
    let string = board.boardArry.reduce(function(accumulator, currentValue, index) {
            return accumulator += ` <div class="grid-item pic${currentValue} clickable" id="${index}"></div> `;
    }, '')
    return string; 
}

game.prototype.delete = function() {
    let toDelete = this.board.deleteFromBoard();
    return toDelete;
}

game.prototype.pushDown = function(){
    let newBoard = this.getBoard();
    newBoard = newBoard.pushDownBoard();
    return newBoard

}

game.prototype.move= function(x,y) {
    let newBoard = this.getBoard();
    newBoard = newBoard.swapIfValid(x,y);
    return newBoard
}

game.prototype.setImageArray = async function() {
    let imgArry = await makeImageArray()
    let valid = validImageArry(imgArry);

    while(!valid) {
        imgArry = await makeImageArray()
        valid = validImageArry(imgArry);
    }

     imgArry = imgArry.map(function(value) {
        return value.url;
    })
    this.imageArray = imgArry;
}

game.prototype.setQuote = async function() {
    let quote = await quoteApi();
    this.quote = quote;

}

game.prototype.isWon = function() {

}


export const makeImageArray = async function() {
    let imgarry =  await nasaAPOD();
    return imgarry;
}

export const validImageArry = function(imgArry) {
    let typeArry = imgArry.map(function(value) {
           return value.media_type;
        })
    if (typeArry.includes('video')) {
        return false;
    } else {
        return true;
    }
}





