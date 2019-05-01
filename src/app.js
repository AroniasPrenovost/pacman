import {generateTable, colorTable} from './modules/generateTable';
import {buildWalls} from './modules/walls';

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
var currentPos = 316; // is middle start position 
var lastPos = [];
var moves = 0;

// board specs 
var tableCells = colors.length;
var height = document.getElementById('table').rows.length;
var rowLength = Math.ceil((tableCells/height)); // +1 if #/10 

// args is currentPos
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

function removeChild(args) {
	while (args.firstChild) args.removeChild(args.firstChild);
}

function populatePowerPellets() {
	let locations = [85, 110, 897, 922]; // to do... update placement
	for (var value of locations) {
		removeChild(colors[value]);
		var pelletdiv = document.createElement('div');
		pelletdiv.classList.add('piece', 'pellet');
		colors[value].appendChild(pelletdiv);
	}	
}

populatePowerPellets();

var ghostNames = ['pinkghost', 'cyanghost', 'redghost', 'orangeghost'];
var deadGhosts = []; 

function getInner(args) {
	args = args.innerHTML; 
	return args.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
}

function getPowerPellet(args) {
	let inner = getInner(args); 
	if (inner.includes('pellet')) {
		removeChild(args); 
		for (var i = 0; i < ghostNames.length; i++) {
			var g = document.getElementsByClassName(ghostNames[i])[0];
			g.classList.add('fright');		
		}
		setTimeout(function(){
			for (var i = 0; i < ghostNames.length; i++) {
				var y = document.getElementsByClassName(ghostNames[i])[0];
				y.classList.remove('fright');		
			}
		}, 7500);
	}
}

function getToken(args) {
	let inner = getInner(args); 
	if (inner.includes('token')) {
		tokens++; 
		tokenCount.textContent = `Tokens: ${tokens}`;
		removeChild(args);
	}
}

function getGhost(args) {
	let inner = getInner(args); 
	if(ghostNames.some(el => inner.includes(el))) {
		if (inner.includes('fright')) {
			let index = inner.indexOf('ghost');
			inner = inner.substring(0, index + 5).split(' ').pop().trim();
			deadGhosts.push(inner);
			ghostNames = ghostNames.filter(e => e !== inner);
			points++; 
			pointCount.textContent = `Points: ${points}`;
			removeChild(args);
		} else { // die 
			pacManDies(args); 
		}
	}
}

// remove tokens inside ghost box 

// 349 is missing 

let removeTokens = [348, 350, 351, 376, 377, 378, 379];
for (var i = 0; i < removeTokens.length; i++) {
	removeChild(colors[removeTokens[i]]);
} 

// populateGhosts
function genGhostDiv(str, int) { // color + board location
	var elem = str + 'ghostdiv';
	elem = document.createElement('div');
	var ghostclass = str + 'ghost';
	elem.classList.add('piece', ghostclass);
	colors[int].appendChild(elem);
}

genGhostDiv('red', 376);
genGhostDiv('pink', 377);
genGhostDiv('cyan', 378);
genGhostDiv('orange', 379);

var pinkGhost = document.getElementsByClassName('pinkghost')[0];
var redGhost = document.getElementsByClassName('redghost')[0];
var cyanGhost = document.getElementsByClassName('cyanghost')[0];
var orangeGhost = document.getElementsByClassName('orangeghost')[0];

var redPos = 376; 
var redDir = null; 

var pinkPos = 377; 
var pinkDir = null;
var pinkLastPos = [];

var cyanPos = 378; 
var cyanDir = null; 

var orangePos = 379;
var orangeDir = null;    

function resetGame() {
	direction = null; 
	menu.style.display = 'block';
	playField.style.display = 'none';

	currentPos = 316;  
	lastPos = [];
	moves = 0;
	points = 0; 
	tokens = 0;
	tokenCount.textContent = `Tokens: ${tokens}`;
	pointCount.textContent = `Points: ${points}`;

	var elem = document.getElementById('table');
	elem.remove();
	generateTable();
	var colors = document.getElementsByClassName('color');
	colorTable(colors, 'white');

	buildWalls();
	populateTokens(); 
	populatePowerPellets();

	let removeTokens = [348, 349, 350, 351, 376, 377, 378, 379];
	for (var i = 0; i < removeTokens.length; i++) {
		removeChild(colors[removeTokens[i]]);
	}

	genGhostDiv('red', 376);
	genGhostDiv('pink', 377);
	genGhostDiv('cyan', 378);
	genGhostDiv('orange', 379); 
}

function pacManDies(args) {
	removeChild(args); 
	args.classList.remove('pacman');
	args.classList.add('dead');
	stopGame(); 
	setTimeout(function(){
		resetGame(); 
	}, 2000);
}


function startGame() {

	function pacManMovement() {
		getToken(colors[currentPos]);
		getPowerPellet(colors[currentPos]);
		getGhost(colors[currentPos]);
		colors[currentPos].classList.add('piece', 'pacman');
		lastPos[lastPos.length-1].classList.remove('piece', 'pacman');
		lastPos.push(colors[currentPos]); 
	}

	function ghostMovement() {	
		genGhostDiv('pink', pinkPos);
		var x = pinkLastPos[pinkLastPos.length-1];
		var pinkg = x.getElementsByClassName('pinkghost');
		var tokeng = x.getElementsByClassName('token');
		var previousTokenElem = x.getElementsByClassName('token');
		var currentTokenElem = colors[pinkPos].getElementsByClassName('token');
		
		while (pinkg[0]) {
			pinkg[0].parentNode.removeChild(pinkg[0]); 
			if (tokeng[0]) {
				tokeng[0].style.width = '10px';
				tokeng[0].style.height = '10px';
			}
		} 		

		// set width to zero on current token
		if (currentTokenElem) {
			currentTokenElem[0].style.width = '0px';
			currentTokenElem[0].style.height = '0px';
		} 
	}

	// initializes snake + food
	if (direction === 'down' || direction === 'up' || direction === 'right' || direction === 'left') {
		if (moves === 0) {
			colors[currentPos].classList.add('piece', 'pacman');
			moves++;
			lastPos.push(colors[currentPos]);
		}
	}

	if (pinkGhost) {
		pinkDir = 'up';  // ----- hardcode 
		if (pinkDir === 'up') {
			pinkLastPos.push(colors[pinkPos]);
			pinkPos = pinkPos - (rowLength); 
			if (!checkBoundaries(pinkPos)) {
				pinkDir = null;
				pinkPos = pinkPos + (rowLength);
				// pinkDir = 'right';  // ----- hardcode 
			} else { 
				ghostMovement();
			}
		}

		// if (pinkDir === 'right') {
		// 	pinkLastPos.push(colors[pinkPos]);
		// 	pinkPos++;
		// 	if (!checkBoundaries(pinkPos)) {
		// 		pinkDir = null;
		// 		--pinkPos;
		// 	} else { 
		// 		ghostMovement();
		// 	}
		// }
	}

	if (direction === 'right') {
		moves++;  
		currentPos++;
		if (!checkBoundaries(currentPos)) {
			direction = null;
			--currentPos;
		} else {
			pacManMovement();
		}
	}

	if (direction === 'left') {
		moves++;
		--currentPos;
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos++; 
		} else {
			pacManMovement();
		}
	}

	if (direction === 'down' && moves > 0) {
		moves++;
		currentPos+=rowLength;  
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos = currentPos - (rowLength);
		} else {
			pacManMovement(); 
		}
	}

	if (direction === 'up') {
		moves++;
		currentPos = currentPos - (rowLength);
		if (!checkBoundaries(currentPos)) {
			direction = null;
			currentPos = currentPos + (rowLength);
		} else {
			pacManMovement();
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
