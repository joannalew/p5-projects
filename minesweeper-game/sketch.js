var grid;
var w = 60;
var rows, cols;
var totalBees = 10;

function setup(){
	createCanvas(601, 601);
	cols = floor(width / w);
	rows = floor(height / w);

	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j] = new cell(i, j, w);
		}
	}
}


function mousePressed(){
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
		return;

	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			if (grid[i][j].contains(mouseX, mouseY)){
				grid[i][j].reveal();
			}
		}
	}

}


function draw(){
	background(255);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}

}

