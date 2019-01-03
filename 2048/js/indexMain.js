var documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return 'black';
}

function getNumberColor(number) {
    if (number <= 4) return '#776e65';
    return 'white';
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) return true;
            }
        }
        return false;
    }
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] === 0 || board[j - 1][j] === board[i][j]) return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) return true;
            }
        }
    }
    return false;
}

function noBlockHorizontal(row, coll, col2, board) {
    for (var i = coll + 1; i < col2; i++) {
        if (board[row][i] != 0) return false;
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) return false;
    }
    return true;
}

function nomove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board)) return false;
    return true;
}

function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber)).css('color', getNumberColor(randNumber)).css('border-radius', 0.06 * cellSideLength).text(randNumber).css('font-size', 0.6 * cellSideLength + 'px');

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    });
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $('#number-cell' + fromx + '-' + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function upDateScore(score) {
    $('#score').text(score);
}

import {
    inherits
} from "util";

var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }

    $('.grid-container').css('width', gridContainerWidth - 2 * cellSpace).css('height', gridContainerWidth - 2 * cellSpace).css('padding', cellSpace).css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength).css('height', cellSideLength).css('border-radius', 0.06 * cellSideLength);
}

function newgame() {
    // 初始化
    init();
    // 随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosTop(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('.grid-container').append('<div class="number-cell" id="number-cell-"' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px').css('height', '0px').css('top', getPosTop(i, j) + 0.5 * cellSideLength).css('left', getPosLeft(i, j) + 0.5 * cellSideLength);
            } else if (board[i][j] > 1000) {
                theNumberCell.css('width', cellSideLength).css('height', cellSideLength).css('top', getPosTop(i, j)).css('left', getPosLeft(i, j)).css('border-radius', 0.06 * cellSideLength).css('background-color', getNumberBackgroundColor(board[i][j])).css('color', getNumberBackgroundColor(board[i][j])).text(board[i][j]).css('font-size', 04 * cellSideLength + 'px');
            } else {
                theNumberCell.css('width', cellSideLength).css('height', cellSideLength).css('top', getPosTop(i, j)).css('left', getPosLeft(i, j)).css('border-radius', 0.06 * cellSideLength).css('background-color', getNumberBackgroundColor(board[i][j])).css('color', getNumberBackgroundColor(board[i][j])).text(board[i][j]).css('font-size', 0.6 * cellSideLength + 'px');
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cellSideLength + 'px');
}


function generateOneNumber() {
    // 判断是否存在空间
    if (nospace(board)) return false;

    // 随机生成一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randx][randy] === 0) break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if (times === 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    // 随机生成一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:

    }
});

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
    event.preventDefault();
});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth) return;

    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isganeover()', 300);
            }
        } else {
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isganeover()', 300);
            }
        }
    } else {
        if (deltay > 0) {
            if (canMoveDown()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isganeover()', 210);
            }
        } else {
            if(canMoveUp()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isganeover();',300);
            }
        }
    }
});

function isganeover(){

}

function gameover(){
    
}