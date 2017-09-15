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

	this.bee = false;
	this.revealed = false;	
}

cell.prototype.show = function(){
	stroke(0);
	strokeWeight(4);
	noFill();
	rect(this.x, this.y, this.w, this.w);	

	if (this.revealed){
		if (this.bee){
			fill(200);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		}
		else{
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			textAlign(CENTER);
			textSize(32);
			fill(0);
			strokeWeight(1);
			var count = this.countNeighbors();
			text(count, this.x + this.w * 0.5, this.y + 41);
		}
	}
}

cell.prototype.reveal = function(){
	this.revealed = true;
}

cell.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}


cell.prototype.countNeighbors = function(){
	var total = 0;

	for (var i = -1; i <= 1; i++){
		for (var j = -1; j <= 1; j++){
			if (this.i + i >= 0 && this.i + i <= rows - 1 && this.j + j >= 0 && this.j + j <= cols - 1){
				var neighbor = grid[this.i + i][this.j + j];
				if (neighbor.bee)
					total++;
			}
		}
	}

	return total;
}