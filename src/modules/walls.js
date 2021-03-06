function buildWalls() {
var spots = document.getElementsByClassName('color');
	for (var i = 0; i < spots.length; i++) {
		
		// top and bottom row walls 
		if (i > -1 && i < 28 ||
				i > 979 && i < 1008) {
			spots[i].classList.toggle('wall');
		}		

		// left hand border
		if (i > 27 && i < 29 ||
			i > 55 && i < 57 ||
			i > 83 && i < 85 ||
			i > 111 && i < 113 ||
			i > 139 && i < 141 ||
			i > 167 && i < 169 ||
			i > 195 && i < 197 ||
			i > 223 && i < 225 ||
			i > 251 && i < 253 ||
			i > 279 && i < 281 ||
			i > 307 && i < 309 ||
			i > 335 && i < 337 ||
			i > 363 && i < 365 ||
			i > 391 && i < 393 ||
			i > 419 && i < 421 ||
			i > 447 && i < 449 ||
			i > 475 && i < 477 ||
			i > 503 && i < 505 ||
			i > 531 && i < 533 ||
			i > 559 && i < 561 ||
			i > 587 && i < 589 ||
			i > 615 && i < 617 ||
			i > 643 && i < 645 ||
			i > 671 && i < 673 ||
			i > 699 && i < 701 ||
			i > 727 && i < 729 ||
			i > 755 && i < 757 ||
			i > 783 && i < 785 ||
			i > 811 && i < 813 ||
			i > 839 && i < 841 ||
			i > 867 && i < 869 ||
			i > 895 && i < 897 ||
			i > 923 && i < 925 ||
			i > 951 && i < 953){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-right-end');
		}

		// right hand border
		if (i > 54 && i < 56 ||			
			i > 82 && i < 84 ||
			i > 110 && i < 112 ||
			i > 138 && i < 140 ||
			i > 166 && i < 168 ||
			i > 194 && i < 196 ||
			i > 222 && i < 224 ||
			i > 250 && i < 252 ||
			i > 278 && i < 280 ||
			i > 306 && i < 308 ||
			i > 334 && i < 336 ||
			i > 362 && i < 364 ||
			i > 390 && i < 392 ||
			i > 418 && i < 420 ||
			i > 446 && i < 448 ||
			i > 474 && i < 476 ||
			i > 502 && i < 504 ||
			i > 530 && i < 532 ||
			i > 558 && i < 560 ||
			i > 586 && i < 588 ||
			i > 614 && i < 616 ||
			i > 642 && i < 644 ||
			i > 670 && i < 672 ||
			i > 698 && i < 700 ||
			i > 726 && i < 728 ||
			i > 754 && i < 756 ||
			i > 782 && i < 784 ||
			i > 810 && i < 812 ||
			i > 838 && i < 840 ||
			i > 866 && i < 868 ||
			i > 894 && i < 896 ||
			i > 922 && i < 924 ||
			i > 950 && i < 952 ||
			i > 978 && i < 980){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
		}

		// first row islands left - right 
		if (i > 57 && i < 62 ||
			i > 85 && i < 90 ||
			i > 113 && i < 118){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}	

		if (i > 62 && i < 68 ||
			i > 90 && i < 96 ||
			i > 118 && i < 124){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

		if (i > 71 && i < 77 ||
			i > 99 && i < 105 ||
			i > 127 && i < 133){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

		if (i > 77 && i < 82 ||
			i > 105 && i < 110 ||
			i > 133 && i < 138){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

		// first row jutt out 
		if (i > 40 && i < 43 ||
			i > 68 && i < 71 ||
			i > 96 && i < 99 ||
			i > 124 && i < 127) {
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

			// left first column
		if (i > 169 && i < 174 ||
			i > 197 && i < 202 ||
			i > 225 && i < 230 ||
			i > 253 && i < 258 ||
			i > 281 && i < 286 ||
			i > 309 && i < 314 ||
			i > 337 && i < 342 ||
			i > 365 && i < 370 ||
			i > 393 && i < 398){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

			// left first column
		if (i > 174 && i < 176 ||
			i > 202 && i < 204 ||
			i > 230 && i < 232 ||
			i > 258 && i < 260 ||
			i > 286 && i < 288 ||
			i > 314 && i < 316 ||
			i > 342 && i < 344 ||
			i > 370 && i < 372 ||
			i > 398 && i < 400){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

	// left second column
		if (i > 176 && i < 178 ||
			i > 204 && i < 206 ||
			i > 232 && i < 234 ||
			i > 260 && i < 264 ||
			i > 288 && i < 290 ||
			i > 316 && i < 318 ||
			i > 344 && i < 346 ||
			i > 372 && i < 374 ||
			i > 400 && i < 402){
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

		// middle top row jutt out 
		if (i > 178 && i < 185 ||
			i > 206 && i < 213 ||
			i > 236 && i < 239 ||
			i > 264 && i < 267) {
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}

		// middle ghost corral 
		if (i > 318 && i < 325 ||
			i > 346 && i < 348 ||
			i > 351 && i < 353 ||
			i > 374 && i < 376 ||
			i > 379 && i < 381 ||
			i > 402 && i < 409) {
			spots[i].classList.toggle('wall');
			spots[i].classList.toggle('wall-left-end');
			spots[i].classList.toggle('wall-right-end');
		}
	}
}

export {buildWalls};
