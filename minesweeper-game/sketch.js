var grid;
var w = 60;
var rows, cols;
var totalBees = 20;

function setup(){
	// create canvas
	createCanvas(601, 601);
	cols = floor(width / w);
	rows = floor(height / w);

	// create grid
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j] = new cell(i, j, w);
		}
	}

	// choose which cells are bees
	for (var n = 0; n < totalBees; n++){
		var i = floor(random(cols));
		var j = floor(random(rows));
		if (grid[i][j].bee){
			n--;
		}
		else{
			grid[i][j].bee = true;
		}
	}

	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].countNeighbors();
		}
	}
}


function mousePressed(){
	// make sure mouse press within bounds
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
		return;

	// flag it if right mouse press
	if (mouseButton == RIGHT){
		for (var i = 0; i < cols; i++){
			for (var j = 0; j < rows; j++){
				if (grid[i][j].contains(mouseX, mouseY)){
					grid[i][j].flag();
				}
			}
		}
		return;
	}


	// show cell (bee or number) upon left mouse press
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			if (grid[i][j].contains(mouseX, mouseY)){
				grid[i][j].reveal();
			
				if (grid[i][j].bee){
					gameOver();
				}
			}
		}
	}
}


function draw(){
	// show the cells
	background(255);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}

}


function gameOver(){
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].reveal();
		}
	}
}