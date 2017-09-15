function make2DArray(cols, rows){
	var arr = new Array (cols);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

function cell(i, j, w){
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0;

	this.bee = false;
	this.revealed = false;
	this.flagged = false;	
}

cell.prototype.show = function(){
	stroke(0);
	strokeWeight(4);
	noFill();
	rect(this.x, this.y, this.w, this.w);	

	// if revealed, show bee or number
	if (this.revealed){
		if (this.bee){
			fill(200);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		}
		else{
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighborCount > 0){
				textAlign(CENTER);
				textSize(32);
				fill(0);
				strokeWeight(1);
				text(this.neighborCount, this.x + this.w * 0.5, this.y + 41);
			}
		}
	}

	// if flagged, show triangle
	if (this.flagged && !this.revealed){
		fill(0);
		triangle(this.x + 10, this.y + this.w - 10, this.x + this.w - 10, this.y + this.w - 10, this.x + this.w * 0.5, this.y + 10);
	}
}

cell.prototype.flag = function(){
	this.flagged = true;
}

cell.prototype.reveal = function(){
	this.revealed = true;
	if (this.neighborCount == 0){
		this.floodfill();
	}
}


cell.prototype.floodfill = function(){
	for (var i = -1; i <= 1; i++){
		for (var j = -1; j <= 1; j++){
			if (this.i + i >= 0 && this.i + i <= rows - 1 && this.j + j >= 0 && this.j + j <= cols - 1){
				var neighbor = grid[this.i + i][this.j + j];
				if (!neighbor.bee && !neighbor.revealed)
					neighbor.reveal();
			}
		}
	}
}

cell.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}


// count number of neighbors that are bees
cell.prototype.countNeighbors = function(){
	if (this.bee){
		this.neighborCount = -1;
		return;
	}

	var total = 0;

	for (var i = -1; i <= 1; i++){
		if (this.i + i < 0 || this.i + i > rows - 1){
			continue;
		}

		for (var j = -1; j <= 1; j++){
			if (this.j + j < 0 || this.j + j > cols - 1){
			 	continue;
			}

			var neighbor = grid[this.i + i][this.j + j];
			if (neighbor.bee)
				total++;
		}
	}

	this.neighborCount = total;
}
