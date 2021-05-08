
import { board } from './Game/boards.js';
import {game} from './Game/game.js'

export const animateX = function(div, div2, px, px2, game1, event) {
    let background = div.style.backgroundImage;
    let background2 = div2.style.backgroundImage;
    game1.getBoard().boardArry = game1.board.swapIfValid(div2.id, event.target.id);
    
    div.animate([{ transform: `translateX(${px})`}], {duration: 1000,})
    var divani2 = div2.animate([{ transform: `translateX(${px2})` }], { duration: 1000,})
    divani2.onfinish = function() {
        div2.classList.remove('isSelected');
        div.classList.remove('isSelected');
        div.style.backgroundImage = background2;
        div2.style.backgroundImage = background;
        game1.getBoard().boardArry = game1.delete()
        game1.board.boardArry.forEach(function(value, index) {
            if (value === 0) {
                $(`#${index}`).replaceWith(` <div class="grid-item-empty" id="${index}"></div> `)
            }
        })
    }
}

export const animateY = function(div, div2, px, px2, game1, event) {
    let background = div.style.backgroundImage;
    let background2 = div2.style.backgroundImage;
    game1.getBoard().boardArry = game1.board.swapIfValid(div2.id, event.target.id);
    
    div.animate([{ transform: `translateY(${px})`}], {duration: 1000,})
    var divani2 = div2.animate([{ transform: `translateY(${px2})` }], { duration: 1000,})
    divani2.onfinish = function() {
        div2.classList.remove('isSelected');
        div.classList.remove('isSelected'); 
        div.style.backgroundImage = background2;
        div2.style.backgroundImage = background;
        game1.getBoard().boardArry = game1.delete()
        game1.board.boardArry.forEach(function(value, index) {
            if (value === 0) {
                $(`#${index}`).replaceWith(` <div class="grid-item-empty" id="${index}"></div> `)
            }
        })
    }
}









$(async function() {
    let darkMode = true;
    let game1 =  new game()
    let selectedElement = null;
    await game1.setImageArray();
    await game1.setQuote();

   let text = game1.quote;
   console.log(text);

    $('.quote-Holder').append(`<blockquote>Random Joke:"${text}"</blockquote>`)

    $('.grid-container').append(game1.HTMLBoard);
    game1.imageArray.forEach(function(value, index) {
        $(`.pic${index+2}`).css("background-image", `url(${value})`);   
    });  

    $('.grid-container').on('click', '.grid-item', function(event){
        selectedElement = onClick(event);
        
    });

    $('.reset').on('click', async function() {
        $('.grid-container').empty()    
        game1 = new game();
        await game1.setImageArray();
        await game1.setQuote();
        $('.grid-container').append(game1.HTMLBoard);
        game1.imageArray.forEach(function(value, index) {
            $(`.pic${index+2}`).css("background-image", `url(${value})`);   
        });  
       
    } )

    $('.mode').on('click', function() {
        if(darkMode) {
            $('body').addClass('lightMode');
            $('button').addClass('lightMode');
            $('.grid-container').addClass('lightMode');
            darkMode = false;
        } else {
            $('body').removeClass('lightMode');
            $('button').removeClass('lightMode');
            $('.grid-container').removeClass('lightMode');
            darkMode = true;
        }
        
    })
    
    



    const onClick =  function(event) {
        if (selectedElement === null) {
                let div = document.getElementById(`${event.target.id}`);
                div.classList.add('isSelected');
                return div;
        } else if(event.target === selectedElement) {
            selectedElement.classList.remove('isSelected');
            return null;
        } else if(JSON.stringify(game1.board.swapIfValid(selectedElement.id, event.target.id)) !== JSON.stringify(game1.board.boardArry)){
            let div = document.getElementById(`${event.target.id}`);
            let div2 = selectedElement;
            div2.classList.remove('isSelected');
            
            if(parseInt(div2.id) === (parseInt(div.id) - 6)  ) {
                animateY(div,div2,'-90px', '+90px', game1, event);
                }
            
            if(parseInt(div2.id) === (parseInt(div.id) + 6)) {
                animateY(div,div2,'+90px', '-90px', game1, event);
                }
            
            if(parseInt(div2.id) === (parseInt(div.id) + 1)) {
                animateX(div,div2,'+90px', '-90px', game1, event);
            } 
        
            if(parseInt(div2.id) === (parseInt(div.id) - 1)) {
                animateX(div,div2,'-90px', '+90px', game1, event);
            }


            setTimeout(function handler() {
            game1.getBoard().boardArry = game1.board.pushDownBoard();
            game1.getBoard().getBoardArry().forEach(function(value, index) {
                let div = document.getElementById(index);
                let classList = div.classList;
                if(value === 0) {
                    $(`#${index}`).replaceWith(` <div class="grid-item-empty" id="${index}"></div> `)
                }else if((!(classList.contains(`pic${value}`))) && (value !== 0)) {
                    $(`#${index}`).replaceWith(` <div class="grid-item pic${value} clickable" id="${index}"></div> `)
                    $(`#${index}`).css("background-image", `url(${game1.imageArray[value-2]})`);
                }
            })
            while(game1.board.movesLeft()) {
            game1.getBoard().boardArry = game1.delete()
            game1.board.boardArry.forEach(function(value, index) {
                if (value === 0) {
                    $(`#${index}`).replaceWith(` <div class="grid-item-empty" id="${index}"></div> `)
                }
            })
            game1.getBoard().boardArry = game1.board.pushDownBoard();
            game1.getBoard().getBoardArry().forEach(function(value, index) {
                let div = document.getElementById(index);
                let classList = div.classList;
                if(value === 0) {
                    $(`#${index}`).replaceWith(` <div class="grid-item-empty" id="${index}"></div> `)
                }else if((!(classList.contains(`pic${value}`))) && (value !== 0)) {
                    $(`#${index}`).replaceWith(` <div class="grid-item pic${value} clickable" id="${index}"></div> `)
                    $(`#${index}`).css("background-image", `url(${game1.imageArray[value-2]})`);
                }
            })
            }
            clearTimeout(handler);
            }, 1400);
            
            return null;
        } else {
            selectedElement.classList.remove('isSelected');
            return null;
        }
    }
    
 


   
   // document.body.style.backgroundImage = `url(${img})`
    //document.body.style.backgroundSize = 'cover'
   




    
}) 