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

var frightModeFlag = false; 
function getPowerPellet(args) {
	let inner = getInner(args); 
	if (inner.includes('pellet')) {
		removeChild(args);
		frightModeFlag = true; 
		for (var i = 0; i < ghostNames.length; i++) {
			var g = document.getElementsByClassName(ghostNames[i])[0];
			g.classList.add('fright');		
		}
		setTimeout(function(){
			for (var i = 0; i < ghostNames.length; i++) {
				var y = document.getElementsByClassName(ghostNames[i])[0];
				y.classList.remove('fright');
				frightModeFlag = false;		
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

// if div contains 2 children, it contains a ghost
// if 3, the ghost is 'frightened'. ghosts can't be killed inside castle 
function getGhost(args) { 
	let argsArr = Object.values(args.children);
	if (argsArr.length === 2) {
		let classes = argsArr[1].classList; 
		if (classes.length === 2) {
			pacManDies(args); 
		} 
		// ghost has 'frightened' class
		if (classes.length === 3) {
			let ghostClass = argsArr[1].classList[1].trim();
			document.getElementsByClassName(ghostClass)[0].remove();
			pinkGhostLife = false; 
			ghostNames = ghostNames.filter(e => e !== ghostClass);
			deadGhosts.push(ghostClass); 
			points++; 
			pointCount.textContent = `Points: ${points}`;
		} 
	}
}

let removeTokens = [348, 349, 350, 351, 376, 377, 378, 379];
for (var i = 0; i < removeTokens.length; i++) {
	removeChild(colors[removeTokens[i]]);
} 

// populateGhosts
function genGhostDiv(str, int) { // color + board location
	var elem = str + 'ghostdiv';
	elem = document.createElement('div');
	var ghostclass = str + 'ghost';
	elem.classList.add('piece', ghostclass);
	if (frightModeFlag === true) {
		elem.classList.add('fright');
	}
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
var redDir = 'up'; 

var pinkPos = 377; 
var pinkDir = 'up';
var pinkLastPos = [];
var pinkGhostLife = true;

var cyanPos = 378; 
var cyanDir = 'up'; 

var orangePos = 379;
var orangeDir = 'up';    

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

	// reset ghosts
	// to do... 

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

// shuffle 
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// -- end ghost movemenet -- // 
function startPinkGhost() {
	function ghostMovement() {	
		genGhostDiv('pink', pinkPos);
		var x = pinkLastPos[pinkLastPos.length-1];
		var pinkg = x.getElementsByClassName('pinkghost');
		var pinkfright = x.getElementsByClassName('fright');
		var tokeng = x.getElementsByClassName('token');
		var previousTokenElem = x.getElementsByClassName('token');
		var currentTokenElem = colors[pinkPos].getElementsByClassName('token');

		while (pinkg[0]) {
			pinkg[0].parentNode.removeChild(pinkg[0]); 
			if (tokeng[0]) {
				tokeng[0].style.width = '5px';
				tokeng[0].style.height = '5px';
			}
		} 		

		// set width to zero on current token
		if (!currentTokenElem) {
			return false; 
		} else  {
			currentTokenElem[0].style.width = '0px';
			currentTokenElem[0].style.height = '0px';
		} 
	}

	var ghostDirections = ['up', 'down', 'right', 'left']; 
	if (pinkGhost) {
		if (moves > 10) {
			pinkLastPos.push(colors[pinkPos]);
		
			if (pinkDir === 'up') {
				pinkPos = pinkPos - (rowLength); 
			} 

			if (pinkDir === 'down') {
				pinkPos+=rowLength;  
			} 

			if (pinkDir === 'right') {
				pinkPos++;
			} 

			if (pinkDir === 'left') {
				--pinkPos;  
			} 		

			if (!checkBoundaries(pinkPos)) {

				if (pinkDir === 'up') {
					pinkPos = pinkPos + (rowLength); 
				} 

				if (pinkDir === 'down') {
					pinkPos = pinkPos - (rowLength);
				} 

				if (pinkDir === 'right') {
					--pinkPos;
				} 

				if (pinkDir === 'left') {
					pinkPos++; 
				} 			

				pinkDir = shuffle(ghostDirections)[0];
			} else { 
				ghostMovement();
			}
		}
	}
}
// -- end ghost movemenet -- // 

function startGame() {

	function pacManMovement() {
		getGhost(colors[currentPos]);
		getToken(colors[currentPos]);
		getPowerPellet(colors[currentPos]);
		colors[currentPos].classList.add('piece', 'pacman');
		lastPos[lastPos.length-1].classList.remove('piece', 'pacman');
		lastPos.push(colors[currentPos]); 
	}

	// initializes snake + food
	if (direction === 'down' || direction === 'up' || direction === 'right' || direction === 'left') {
		if (moves === 0) {
			colors[currentPos].classList.add('piece', 'pacman');
			moves++;
			lastPos.push(colors[currentPos]);
		}
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

	if (moves > 10 && pinkGhostLife) {
		startPinkGhost(); 
	}

	d.onkeyup = d.body.onkeyup = function(e){
    if(e.keyCode == 32){
    	stopGame();
    }
	}
} 
