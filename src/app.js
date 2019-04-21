import {generateTable, colorTable} from './modules/generateTable';
import {buildWalls} from './modules/walls';
import {shuffle} from './modules/shuffle';

// initialize 
generateTable();
var colors = document.getElementsByClassName('color');
colorTable(colors, 'white');

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


var tokens = 0;
var tokenCount = document.getElementById('tokens');
tokenCount.textContent = `Tokens: ${tokens}`;

var points = 0;  
var pointCount = document.getElementById('points');
pointCount.textContent = `Points: ${points}`;

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

// args is currentPos, dir = direction
function checkBoundaries(args) {
	let cell = colors[args].classList;
	if (cell.contains('wall')) {
		return false; 
	}
	return true; 
}

// build walls 
buildWalls();

function openGhostDoor() {
	colors[321].classList.remove('wall', 'wall-left-end', 'wall-right-end');
	colors[322].classList.remove('wall', 'wall-left-end', 'wall-right-end');
}

function populateTokens() {
	for (var i = 0; i < colors.length; i++) {
		if (!colors[i].classList.contains('wall')) {
			var tokendiv = document.createElement('div');
			tokendiv.classList.add('piece', 'token');
			colors[i].appendChild(tokendiv)
		}
	}
}

populateTokens();

function getToken(args) {
	let inner = args.innerHTML;
	inner = inner.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
	if (inner.includes('token')) {
		tokens++; 
		tokenCount.textContent = `Tokens: ${tokens}`;
		while (args.firstChild) args.removeChild(args.firstChild);
	}
}

function getGhost(args) {
	let inner = args.innerHTML;
	inner = inner.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
	let ghostNames = ['pinkghost', 'cyanghost', 'redghost', 'orangeghost'];
	if(ghostNames.some(el => inner.includes(el))) {
		points++; 
		pointCount.textContent = `Points: ${points}`;
		while (args.firstChild) args.removeChild(args.firstChild);
	}
}

// remove tokens inside ghost box 
let removeTokens = [348, 349, 350, 351, 376, 377, 378, 379];
for (var i = 0; i < removeTokens.length; i++) {
	while (colors[removeTokens[i]].firstChild) colors[removeTokens[i]].removeChild(colors[removeTokens[i]].firstChild);
} 

function populateGhosts() {
	var redghostdiv = document.createElement('div');
	redghostdiv.classList.add('piece', 'redghost');
	colors[376].appendChild(redghostdiv);

	var pinkghostdiv = document.createElement('div');
	pinkghostdiv.classList.add('piece', 'pinkghost');
	colors[377].appendChild(pinkghostdiv);

	var cyanghostdiv = document.createElement('div');
	cyanghostdiv.classList.add('piece', 'cyanghost');
	colors[378].appendChild(cyanghostdiv);

	var orangeghostdiv = document.createElement('div');
	orangeghostdiv.classList.add('piece', 'orangeghost');
	colors[379].appendChild(orangeghostdiv); 
}

populateGhosts();

// initialize snake length 
function snakeChange() {
	if (moves > 1) {
		lastPos[0].classList.remove('piece', 'pacman');
		backup = lastPos[0];
		lastPos.shift(); 
		trimTail = true; 
	}
}

// takes 'lastPos' as argument 
function snakeDies(snake) {
	// return to menu
	setTimeout(function(){
		for (let i = 0; i < colors.length; i++) {
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
	if (direction === 'down' || direction === 'up' || direction === 'right' || direction === 'left') {
		if (moves === 0) {
			colors[currentPos].classList.add('piece', 'pacman');
			moves++;
			lastPos.push(colors[currentPos]); 
		}
	}

	if (direction == 'right') {
		moves++;  
		currentPos++;
		if (!checkBoundaries(currentPos)) {
			direction = null;
			--currentPos;
		} else {
			getToken(colors[currentPos]);
			getGhost(colors[currentPos]);
			colors[currentPos].classList.add('piece', 'pacman');
			lastPos.push(colors[currentPos]);
			snakeChange(); 
		}
	}

	if (direction === 'left') {
		moves++;
		--currentPos;
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos++; 
		} else {
			getToken(colors[currentPos]);
			getGhost(colors[currentPos]);
			colors[currentPos].classList.add('piece', 'pacman');
			lastPos.push(colors[currentPos]);
			snakeChange();
		}
	}

	if (direction === 'down' && moves > 0) {
		moves++;
		currentPos+=rowLength;  
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos = currentPos - (rowLength);
		} else {
			getToken(colors[currentPos]);
			getGhost(colors[currentPos]);
			colors[currentPos].classList.add('piece', 'pacman');
			lastPos.push(colors[currentPos]);  
			snakeChange();
		}
	}

	if (direction === 'up') {
		moves++;
		currentPos = currentPos - (rowLength);
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos = currentPos + (rowLength);
		} else {
			getToken(colors[currentPos]);
			getGhost(colors[currentPos]);
			colors[currentPos].classList.add('piece', 'pacman');
			lastPos.push(colors[currentPos]); 
			snakeChange();
		}
	}

	if (moves === 10) {
		openGhostDoor();
	}

	d.onkeyup = d.body.onkeyup = function(e){
    if(e.keyCode == 32){
    	stopGame();
    }
	}
} 
