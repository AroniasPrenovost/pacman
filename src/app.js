import {generateTable, colorTable} from './modules/generateTable';
import {buildWalls} from './modules/walls';
import {shuffle} from './modules/shuffle';

var white = 'white';
var green = 'rgb(204, 122, 8)';
var yellow = 'rgb(255, 238, 0)';
var yellowone = 'rgb(52, 152, 219)'; 

// initialize 
generateTable();
var colors = document.getElementsByClassName('color');
colorTable(colors, white);

var gameVar; 
function stopGame() {
    clearInterval(gameVar);
}

function initGame(time) {
    gameVar = setInterval(startGame, time);
}

var menu = document.querySelector('.menu');
var playField = document.getElementById('myDynamicTable');

document.getElementById('slow').onclick = function(){ 
	initGame(200);
	menu.style.display = 'none';
	playField.style.display = 'block';
}

var points = 0; 
var scoreBoard = document.getElementById('points');
scoreBoard.textContent = `Points: ${points}`;

// arrow key press
var d = document;
var direction; 
d.onkeydown = d.body.onkeydown = function(e){
	e = e || window.event;

	switch (e.keyCode || e.which) {
	  case 37:
	    direction = 'left';
	    
	    break;
	  case 38:
	    direction = 'up';
	    break;
	  case 39:
	     direction = 'right';
	    break;
	  case 40:
	    direction = 'down';
	    break;
	  case 4:
	    direction = null;
	}
}

// control snake 
// current board position based on total 'length'
var currentPos = 315; // is middle start position 
var lastPos = [];
var trimTail = false;
var foodLocation = [];
var backup;  
var moves = 0;

// board specs 
var tableCells = colors.length;
var height = document.getElementById('table').rows.length;
var rowLength = Math.ceil((tableCells/height)); // +1 if #/10 

function checkHorizontalBoundaries(args, dir) {
	if (dir === 'right') {
		if (args % rowLength === 0) {  
			return false; 
		} 
	}

	if (dir === 'left') {
		if ((args+1) % rowLength === 0) {  
			return false; 
		}
	}
	return true; 
}

// build walls 
buildWalls(); 

// add snake food at random location on grid 
function generateFood() {
	let rand = shuffle([...Array(colors.length).keys()])[0];
	if (colors[rand].style.backgroundColor !== green && colors[rand].style.backgroundColor !== yellow) {
		colors[rand].style.backgroundColor = green;
		foodLocation.push(rand);  
	}
}

// initialize snake length 
function snakeChange() {
	if (moves > 1) {
		lastPos[0].style.backgroundColor = white;
		backup = lastPos[0];
		lastPos.shift(); 
		trimTail = true; 
	}
}

// takes 'lastPos' as argument 
function snakeDies(snake) {
	snake = snake.reverse(); 
	for (let i = 0; i < snake.length; i++) {
    snake[i].style.backgroundColor = yellowone; 
	}
	// return to menu
	setTimeout(function(){
		for (let i = 0; i < colors.length; i++) {
	    colors[i].style.backgroundColor = white; 
	    moves = 0;  
			lastPos.length = 0;
			currentPos = 315;
			foodLocation.length = 0;
			direction = null; 
		}
		menu.style.display = 'block';
		playField.style.display = 'none';
	}, 2000);

	 stopGame(); 
}

function startGame() {

	// initializes snake + food
	if (
			direction === 'down' || 
			direction === 'up' || 
			direction === 'right' || 
			direction === 'left'
			) {
		if (moves === 0) {
			colors[currentPos].style.backgroundColor = yellow;
			generateFood(); 
			moves++;
			lastPos.push(colors[currentPos]); 
		}
	}

	if (direction == 'right') {
		moves++;  
		currentPos++;
		if (colors[currentPos].style.backgroundColor !== yellow) {
			if (!checkHorizontalBoundaries(currentPos, direction)) {
				snakeDies(lastPos); 
			} else {
				colors[currentPos].style.backgroundColor = yellow;
				lastPos.push(colors[currentPos]);
				snakeChange(); 
			}
		} else {
			snakeDies(lastPos); 
		} 
	}

	if (direction === 'left') {
		moves++;
		--currentPos;
		if (colors[currentPos].style.backgroundColor !== yellow) {
			if (!checkHorizontalBoundaries(currentPos, direction)) {
				snakeDies(lastPos);
			} else {
				colors[currentPos].style.backgroundColor = yellow;
				lastPos.push(colors[currentPos]);
				snakeChange();
			}
		} else {
			snakeDies(lastPos); 
		}
	}

	if (direction === 'down' && moves > 0) {
		moves++;
		currentPos+=rowLength;  
		if (!colors[currentPos]) {
			snakeDies(lastPos);
		}
		if (colors[currentPos].style.backgroundColor !== yellow) {
			colors[currentPos].style.backgroundColor = yellow;
			lastPos.push(colors[currentPos]);  
			snakeChange();
		} else {
			snakeDies(lastPos);
		}
	}

	if (direction === 'up') {
		moves++;
		currentPos = currentPos - (rowLength);
		if (!colors[currentPos]) {
			snakeDies(lastPos);
		}
		if (colors[currentPos].style.backgroundColor !== yellow) {
			colors[currentPos].style.backgroundColor = yellow;
			lastPos.push(colors[currentPos]); 
			snakeChange();
		} else {
			snakeDies(lastPos);
		} 
	}

	for (var s = 0; s < foodLocation.length; s++) {
		if (direction === 'right'){
			if (currentPos - 1 === foodLocation[s]) {
				// lastPos.unshift(backup);
				// generateFood();
				points+=1;  
				//	colors[backup].style.backgroundColor = yellow;
				return false; 
			}
		}

		if (direction === 'left'){
			if (currentPos + 1 === foodLocation[s]) {
				//	lastPos.unshift(backup);
				//	generateFood(); 
				points+=1;  
				//	colors[backup].style.backgroundColor = yellow;
				return false; 
			}
		}

		if (direction === 'down'){
			if (currentPos - rowLength === foodLocation[s]) {
				//	lastPos.unshift(backup);
				//	generateFood(); 
				points+=1;  
				//	colors[backup].style.backgroundColor = yellow;
				return false; 
			}
		}

		if (direction === 'up'){
			if (currentPos + rowLength === foodLocation[s]) {
				//	lastPos.unshift(backup);
				//	generateFood(); 
				points+=1;  
				//	colors[backup].style.backgroundColor = yellow;
				return false; 
			}
		}
	}

	// 
	scoreBoard.textContent = `Points: ${points}`;

	d.onkeyup = d.body.onkeyup = function(e){
    if(e.keyCode == 32){
    	stopGame();
    }
	}
} 
